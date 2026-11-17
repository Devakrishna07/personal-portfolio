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

export const DEFAULT_PORTFOLIO_CONTENT: PortfolioContent = {
  id: "main",
  hero_name: "Deva Prasad NR",
  hero_roles: ["Developer", "Creator", "DevOps Engineer"],
  hero_image: "/deva-mood.png",
  hero_image_fit: "contain",
  hero_image_position: "bottom-right",
  hero_image_scale: 110,
  hero_image_focal_x: 50,
  hero_image_focal_y: 100,
  about_name: "Deva Prasad NR",
  about_roles: ["Developer", "Designer", "Creator", "Engineer"],
  about_image: "/aboutme_image.png",
  about_image_fit: "cover",
  about_image_position: "top",
  about_image_focal_x: 50,
  about_image_focal_y: 20,
  about_location: "Karnataka, India",
  about_role_title: "Full Stack & Creative Dev",
  about_email: "devaprasadnr@gmail.com",
  about_linkedin: "https://linkedin.com/in/devaprasad",
  about_github: "https://github.com/devaprasad",
  about_bio:
    "I am a passionate software engineer and creative technologist dedicated to crafting high-performance web applications and immersive digital experiences. With a deep foundation in modern full-stack development, I specialize in translating complex architectural challenges into clean, modular, and maintainable software systems. My technical expertise spans the entire React and Next.js ecosystem, robust backend engineering, and interactive 3D WebGL visualizations with Three.js. I thrive at the intersection of functional programming, fluid motion design, and systems architecture—always prioritizing pixel perfection, accessibility, and optimal performance metrics. Whether architecting scalable cloud solutions, designing intuitive user journeys, or optimizing rendering pipelines for seamless 60fps animations, I approach every project with relentless curiosity and engineering discipline. Beyond writing code, I love collaborating with cross-functional teams, exploring cutting-edge web technologies, and contributing to open-source innovations that make the modern web faster, more dynamic, and visually engaging for everyone.",
};
