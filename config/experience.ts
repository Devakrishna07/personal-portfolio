export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startYear: string;
  endYear: string;
  logo: string;
  location?: string;
  description: string[];
}

export const experiencesData: ExperienceItem[] = [
  {
    id: "exp-1",
    company: "Tech Innovations Inc.",
    role: "Full Stack Developer",
    startYear: "2024",
    endYear: "Present",
    logo: "/icons/briefcase.svg",
    location: "Bangalore, India",
    description: [
      "Engineered performant full-stack web applications with Next.js, TypeScript, and Node.js.",
      "Integrated real-time graphics and WebGL-powered 3D interactive user interfaces.",
      "Optimized load times and rendering pipelines, improving user engagement by 35%."
    ],
  },
  {
    id: "exp-2",
    company: "Creative Cloud Solutions",
    role: "Frontend Developer Intern",
    startYear: "2023",
    endYear: "2024",
    logo: "/icons/briefcase.svg",
    location: "Remote",
    description: [
      "Developed modular UI component libraries with Tailwind CSS and Framer Motion.",
      "Collaborated on responsive design implementations and cross-device testing.",
      "Assisted in REST and GraphQL API integrations and state management workflows."
    ],
  },
];
