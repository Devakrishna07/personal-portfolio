import { createClient } from "@/lib/supabase/server";
import { PortfolioContent } from "./types";

/**
 * Fetch portfolio content directly on the server (SSR).
 * Only import and use this in Server Components (e.g. app/page.tsx).
 */
export async function getPortfolioContentServer(): Promise<PortfolioContent | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("portfolio_content")
      .select("*")
      .eq("id", "main")
      .single();

    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}
