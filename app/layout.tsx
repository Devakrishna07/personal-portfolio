import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/sections/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devaprasadnr.duckdns.org"),
  title: {
    default: "Deva Prasad NR | Full-Stack Python Developer (Django, Frappe, React)",
    template: "%s | Deva Prasad NR",
  },
  description:
    "Portfolio of Deva Prasad NR — Full-Stack Python Developer specializing in Python, Django, Frappe (ERPNext) Framework, and modern React architectures.",
  keywords: [
    "Deva Prasad",
    "Deva Prasad NR",
    "Full-Stack Python Developer",
    "Python Developer",
    "Django Developer",
    "Frappe Framework Developer",
    "ERPNext Developer",
    "React Developer",
    "Backend Engineer",
    "Next.js Developer",
    "PostgreSQL",
    "Python Web Developer",
  ],
  authors: [{ name: "Deva Prasad NR", url: "https://devaprasadnr.duckdns.org" }],
  creator: "Deva Prasad NR",
  alternates: {
    canonical: "https://devaprasadnr.duckdns.org",
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://devaprasadnr.duckdns.org",
    title: "Deva Prasad NR | Full-Stack Python Developer (Django, Frappe, React)",
    description:
      "Explore projects, technical expertise, and production systems crafted by Deva Prasad NR — Specializing in scalable Python backends, Frappe apps, and modern React applications.",
    siteName: "Deva Prasad NR Portfolio",
    images: [
      {
        url: "/deva-mood.png",
        width: 1200,
        height: 630,
        alt: "Deva Prasad NR - Full-Stack Python Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deva Prasad NR | Full-Stack Python Developer",
    description: "Specializing in Python, Django, Frappe Framework, and React.",
    images: ["/deva-mood.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/icon.png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-[#07080a] text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
