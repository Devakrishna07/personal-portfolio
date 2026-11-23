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
