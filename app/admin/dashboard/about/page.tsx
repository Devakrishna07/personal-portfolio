import React from "react";
import { AboutContentEditor } from "@/components/admin/AboutContentEditor";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit About // Admin Portal",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminAboutEditorPage() {
  return (
    <main className="min-h-screen w-full bg-[#000000] text-neutral-100 selection:bg-red-500 selection:text-white">
      <AboutContentEditor />
    </main>
  );
}
