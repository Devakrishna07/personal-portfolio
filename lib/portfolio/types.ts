export interface PortfolioContent {
  id: string;
  hero_name: string;
  hero_roles: string[];
  hero_image: string;
  hero_image_fit: "contain" | "cover";
  hero_image_position: "bottom-right" | "center" | "bottom-center" | "top";
  hero_image_scale: number;
  hero_image_focal_x?: number;
  hero_image_focal_y?: number;
  about_name: string;
  about_roles: string[];
  about_image: string;
  about_image_fit: "cover" | "contain";
  about_image_position: "top" | "center" | "bottom";
  about_image_focal_x?: number;
  about_image_focal_y?: number;
  about_location: string;
  about_role_title: string;
  about_email: string;
  about_linkedin: string;
  about_github: string;
  about_bio: string;
  updated_at?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  github_url?: string;
  live_url?: string;
  order_index: number;
  tags?: string[];
}

// Initial structural template for empty or loading states (not mock projects)
export const DEFAULT_PORTFOLIO_CONTENT: PortfolioContent = {
  id: "main",
  hero_name: "",
  hero_roles: [],
  hero_image: "",
  hero_image_fit: "contain",
  hero_image_position: "bottom-right",
  hero_image_scale: 100,
  about_name: "",
  about_roles: [],
  about_image: "",
  about_image_fit: "cover",
  about_image_position: "top",
  about_location: "",
  about_role_title: "",
  about_email: "",
  about_linkedin: "",
  about_github: "",
  about_bio: "",
};
