import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Use server client which passes auth cookies
    const supabase = await createClient();

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const storagePath = `uploads/${timestamp}_${cleanFileName}`;

    // Upload to Supabase Storage bucket 'portfolio-assets'
    const { error: uploadError } = await supabase.storage
      .from("portfolio-assets")
      .upload(storagePath, buffer, {
        contentType: file.type || "image/png",
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json(
        {
          error: `Supabase Storage upload failed: ${uploadError.message}. Ensure RLS policy for insert on 'portfolio-assets' is enabled in Supabase.`,
        },
        { status: 500 }
      );
    }

    // Get public URL from Supabase
    const {
      data: { publicUrl },
    } = supabase.storage.from("portfolio-assets").getPublicUrl(storagePath);

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to upload file";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
