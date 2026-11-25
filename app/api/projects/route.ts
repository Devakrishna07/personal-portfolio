import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/projects - Retrieve all projects ordered by order_index
export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const projects = (data || []).map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      image_url: item.image_url || "",
      github_url: item.github_url || undefined,
      live_url: item.live_url || undefined,
      order_index: item.order_index ?? 0,
      tags: Array.isArray(item.tags) ? item.tags : [],
    }));

    return NextResponse.json({ success: true, data: projects });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to fetch projects";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST /api/projects - Create a new project (requires authenticated admin)
export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, image_url, github_url, live_url, order_index, tags } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      image_url: image_url?.trim() || "",
      github_url: github_url?.trim() || null,
      live_url: live_url?.trim() || null,
      order_index: typeof order_index === "number" ? order_index : parseInt(order_index, 10) || 0,
      tags: Array.isArray(tags) ? tags : [],
    };

    const { data, error } = await supabase
      .from("projects")
      .insert(payload)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id: data.id,
          title: data.title,
          description: data.description,
          image_url: data.image_url || "",
          github_url: data.github_url || undefined,
          live_url: data.live_url || undefined,
          order_index: data.order_index ?? 0,
          tags: Array.isArray(data.tags) ? data.tags : [],
        },
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create project";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
