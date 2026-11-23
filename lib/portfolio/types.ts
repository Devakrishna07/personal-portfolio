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

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "NeuroMesh AI Studio",
    description:
      "A distributed neural visualization playground rendering real-time high-dimensional graph topologies in WebGL with zero-latency inference streaming.",
    image_url: "/aboutme_image.png",
    github_url: "https://github.com/devaprasad/neuromesh-studio",
    live_url: "https://neuromesh.io",
    order_index: 1,
    tags: ["Next.js", "WebGL", "TypeScript", "TailwindCSS"],
  },
  {
    id: "proj-2",
    title: "Crimson Cloud Orchestrator",
    description:
      "Cloud-native microservice telemetry dashboard featuring eBPF traffic observability, automated canary deployments, and sub-second metrics aggregation.",
    image_url: "/deva-mood.png",
    github_url: "https://github.com/devaprasad/crimson-orchestrator",
    live_url: "https://crimson-telemetry.dev",
    order_index: 2,
    tags: ["Go", "Kubernetes", "Next.js", "GraphQL"],
  },
  {
    id: "proj-3",
    title: "HyperScale Quantum Sharder",
    description:
      "Decentralized state machine consensus engine with deterministic execution pipelines and cryptographic verification for cross-chain state relays.",
    image_url: "/aboutme_image.png",
    github_url: "https://github.com/devaprasad/quantum-sharder",
    live_url: "https://quantum-shard.network",
    order_index: 3,
    tags: ["Rust", "WASM", "WebRTC", "Three.js"],
  },
  {
    id: "proj-4",
    title: "VaporPulse Audio Synth",
    description:
      "Interactive audio visualizer synthesizing multi-channel polyphonic frequencies directly inside the browser using Web Audio API and custom GPU shaders.",
    image_url: "/deva-mood.png",
    github_url: "https://github.com/devaprasad/vapor-pulse-synth",
    order_index: 4,
    tags: ["Web Audio API", "GLSL", "React"],
  },
  {
    id: "proj-5",
    title: "Sentinel Zero-Trust Gateway",
    description:
      "Modern identity-aware perimeter proxy enforcing fine-grained RBAC, biometric challenge authentication, and distributed edge session management.",
    image_url: "/aboutme_image.png",
    github_url: "https://github.com/devaprasad/sentinel-zt-gateway",
    live_url: "https://sentinel-security.dev",
    order_index: 5,
    tags: ["TypeScript", "Next.js", "Docker", "Redis"],
  },
  {
    id: "proj-6",
    title: "Aether Flow Simulation",
    description:
      "Real-time Navier-Stokes 2D fluid dynamics solver utilizing WebGL fragment shaders for interactive fluid vortex turbulence and collision dynamics.",
    image_url: "/deva-mood.png",
    github_url: "https://github.com/devaprasad/aether-flow-fluid",
    live_url: "https://aether-flow.dev",
    order_index: 6,
    tags: ["GLSL", "WebGL", "Math", "React"],
  },
];
