import { Metadata } from "next";
import { PortfolioHomeClient } from "@/components/home/PortfolioHomeClient";
import { DEFAULT_PORTFOLIO_CONTENT } from "@/lib/portfolio/types";

export const metadata: Metadata = {
  title: "Deva Prasad NR | Full-Stack Python Developer (Django, Frappe, React)",
  description:
    "Deva Prasad NR is a Full-Stack Python Developer specializing in Django, Frappe (ERPNext) Framework, and modern React architectures.",
  alternates: {
    canonical: "https://devaprasadnr.duckdns.org",
  },
};

export default function Home() {
  const initialData = DEFAULT_PORTFOLIO_CONTENT;

  return (
    <>
      {/* Semantic Fallback for search engine crawlers & accessibility */}
      <div className="sr-only" aria-hidden="false">
        <h1>Deva Prasad NR - Full-Stack Python Developer</h1>
        <p>
          Specializing in Python, Django, Frappe (ERPNext) Framework, and React applications.
        </p>
        <h2>Technical Core Stack</h2>
        <ul>
          <li>Python, Django, Django REST Framework</li>
          <li>Frappe Framework, ERPNext customization</li>
          <li>React, Next.js, TypeScript, Tailwind CSS</li>
          <li>PostgreSQL, Redis, Docker, Linux, CI/CD</li>
        </ul>
        <h2>About Deva Prasad NR</h2>
        <p>{initialData.about_bio}</p>
        <p>Location: {initialData.about_location}</p>
      </div>

      {/* Interactive Visual Experience */}
      <PortfolioHomeClient initialData={initialData} />
    </>
  );
}
