import { createClient } from "@/lib/supabase/client";
import {
  PortfolioContent,
  DEFAULT_PORTFOLIO_CONTENT,
  Project,
  DEFAULT_PROJECTS,
} from "./types";

export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_PROJECTS;
    }

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      image_url: item.image_url || "/aboutme_image.png",
      github_url: item.github_url || undefined,
      live_url: item.live_url || undefined,
      order_index: item.order_index ?? 0,
      tags: Array.isArray(item.tags) ? item.tags : [],
    }));
  } catch {
    return DEFAULT_PROJECTS;
  }
}

export async function createProject(
  project: Omit<Project, "id">
): Promise<{ success: boolean; data?: Project; error?: string }> {
  try {
    const supabase = createClient();
    const payload = {
      title: project.title,
      description: project.description,
      image_url: project.image_url || "",
      github_url: project.github_url || null,
      live_url: project.live_url || null,
      order_index: project.order_index ?? 0,
      tags: project.tags || [],
    };

    const { data, error } = await supabase
      .from("projects")
      .insert(payload)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return {
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
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create project";
    return { success: false, error: msg };
  }
}

export async function updateProject(
  id: string,
  updates: Partial<Project>
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient();
    const payload: Record<string, unknown> = {};

    if (updates.title !== undefined) payload.title = updates.title;
    if (updates.description !== undefined) payload.description = updates.description;
    if (updates.image_url !== undefined) payload.image_url = updates.image_url;
    if (updates.github_url !== undefined) payload.github_url = updates.github_url || null;
    if (updates.live_url !== undefined) payload.live_url = updates.live_url || null;
    if (updates.order_index !== undefined) payload.order_index = updates.order_index;
    if (updates.tags !== undefined) payload.tags = updates.tags;

    const { error } = await supabase
      .from("projects")
      .update(payload)
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update project";
    return { success: false, error: msg };
  }
}

export async function deleteProject(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete project";
    return { success: false, error: msg };
  }
}


export async function getPortfolioContent(): Promise<PortfolioContent> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("portfolio_content")
      .select("*")
      .eq("id", "main")
      .single();

    if (error || !data) {
      return DEFAULT_PORTFOLIO_CONTENT;
    }

    return {
      ...DEFAULT_PORTFOLIO_CONTENT,
      ...data,
      hero_roles: Array.isArray(data.hero_roles) && data.hero_roles.length ? data.hero_roles : DEFAULT_PORTFOLIO_CONTENT.hero_roles,
      about_roles: Array.isArray(data.about_roles) && data.about_roles.length ? data.about_roles : DEFAULT_PORTFOLIO_CONTENT.about_roles,
    };
  } catch {
    return DEFAULT_PORTFOLIO_CONTENT;
  }
}

export async function updatePortfolioContent(
  updates: Partial<PortfolioContent>
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient();
    
    // Upsert the main row
    const payload = {
      id: "main",
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("portfolio_content")
      .upsert(payload, { onConflict: "id" });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update content";
    return { success: false, error: msg };
  }
}
