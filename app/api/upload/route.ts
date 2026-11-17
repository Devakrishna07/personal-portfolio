import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
      // Fallback: If bucket doesn't exist yet, explain clearly
      return NextResponse.json(
        {
          error: `Supabase Storage upload failed: ${uploadError.message}. Ensure 'portfolio-assets' bucket exists in your Supabase dashboard.`,
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
