import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PATCH /api/projects/[id] - Update a specific project
export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Missing project ID" }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const payload: Record<string, unknown> = {};

    if (body.title !== undefined) payload.title = body.title.trim();
    if (body.description !== undefined) payload.description = body.description.trim();
    if (body.image_url !== undefined) payload.image_url = body.image_url.trim();
    if (body.github_url !== undefined) payload.github_url = body.github_url?.trim() || null;
    if (body.live_url !== undefined) payload.live_url = body.live_url?.trim() || null;
    if (body.order_index !== undefined) {
      payload.order_index =
        typeof body.order_index === "number"
          ? body.order_index
          : parseInt(body.order_index, 10) || 0;
    }
    if (body.tags !== undefined) {
      payload.tags = Array.isArray(body.tags) ? body.tags : [];
    }

    const { error } = await supabase.from("projects").update(payload).eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update project";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// DELETE /api/projects/[id] - Delete a project
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Missing project ID" }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete project";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
