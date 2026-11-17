import React from "react";

interface JsonLdProps {
  name?: string;
  roles?: string[];
  bio?: string;
  github?: string;
  linkedin?: string;
}

export function JsonLd({
  name = "Deva Prasad NR",
  roles = ["Full-Stack Python Developer", "Django Developer", "Frappe Framework Developer", "React Developer"],
  bio = "Full-Stack Python Developer specializing in Python, Django, Frappe (ERPNext) Framework, and modern React architectures.",
  github = "https://github.com/devaprasad",
  linkedin = "https://linkedin.com/in/devaprasad",
}: JsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://devaprasadnr.duckdns.org/#website",
        "url": "https://devaprasadnr.duckdns.org",
        "name": `${name} | Portfolio`,
        "description": bio,
        "publisher": {
          "@id": "https://devaprasadnr.duckdns.org/#person",
        },
        "inLanguage": "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": "https://devaprasadnr.duckdns.org/#webpage",
        "url": "https://devaprasadnr.duckdns.org",
        "name": `${name} - Full-Stack Python Developer Portfolio`,
        "isPartOf": {
          "@id": "https://devaprasadnr.duckdns.org/#website",
        },
        "about": {
          "@id": "https://devaprasadnr.duckdns.org/#person",
        },
        "mainEntity": {
          "@id": "https://devaprasadnr.duckdns.org/#person",
        },
      },
      {
        "@type": "Person",
        "@id": "https://devaprasadnr.duckdns.org/#person",
        "name": name,
        "alternateName": ["Deva Prasad", "DevaPrasad NR"],
        "jobTitle": "Full-Stack Python Developer",
        "description": bio,
        "url": "https://devaprasadnr.duckdns.org",
        "image": "https://devaprasadnr.duckdns.org/deva-mood.png",
        "sameAs": [github, linkedin].filter(Boolean),
        "knowsAbout": [
          "Python",
          "Django",
          "Frappe Framework",
          "ERPNext",
          "React",
          "Next.js",
          "PostgreSQL",
          "RESTful APIs",
          "Docker",
          "DevOps",
          "Full-Stack Web Development",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
