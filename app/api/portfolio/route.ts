import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/portfolio - Retrieve dynamic portfolio content
export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("portfolio_content")
      .select("*")
      .eq("id", "main")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to fetch portfolio content";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// PUT /api/portfolio - Update or create portfolio content
export async function PUT(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const payload = {
      id: "main",
      ...body,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("portfolio_content")
      .upsert(payload, { onConflict: "id" });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update portfolio content";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
