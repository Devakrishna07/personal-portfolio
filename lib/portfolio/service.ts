import { Project, PortfolioContent } from "./types";

/**
 * Fetch all projects from the backend API.
 * Returns an empty array [] if there are no projects in the database.
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch("/api/projects", {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch {
    return [];
  }
}

/**
 * Create a new project via the backend API.
 */
export async function createProject(
  project: Omit<Project, "id">
): Promise<{ success: boolean; data?: Project; error?: string }> {
  try {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });

    const json = await res.json();
    if (!res.ok) {
      return { success: false, error: json.error || "Failed to create project" };
    }

    return { success: true, data: json.data };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create project";
    return { success: false, error: msg };
  }
}

/**
 * Update an existing project via the backend API.
 */
export async function updateProject(
  id: string,
  updates: Partial<Project>
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    const json = await res.json();
    if (!res.ok) {
      return { success: false, error: json.error || "Failed to update project" };
    }

    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update project";
    return { success: false, error: msg };
  }
}

/**
 * Delete a project by ID via the backend API.
 */
export async function deleteProject(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });

    const json = await res.json();
    if (!res.ok) {
      return { success: false, error: json.error || "Failed to delete project" };
    }

    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete project";
    return { success: false, error: msg };
  }
}

/**
 * Fetch portfolio content from the backend API.
 */
export async function getPortfolioContent(): Promise<PortfolioContent | null> {
  try {
    const res = await fetch("/api/portfolio", {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    return json.data || null;
  } catch {
    return null;
  }
}

/**
 * Update portfolio content via the backend API.
 */
export async function updatePortfolioContent(
  updates: Partial<PortfolioContent>
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("/api/portfolio", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    const json = await res.json();
    if (!res.ok) {
      return { success: false, error: json.error || "Failed to update content" };
    }

    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update content";
    return { success: false, error: msg };
  }
}
