import React from "react";
import { HomeContentEditor } from "@/components/admin/HomeContentEditor";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Home // Admin Portal",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminHomeEditorPage() {
  return (
    <main className="min-h-screen w-full bg-[#000000] text-neutral-100 selection:bg-red-500 selection:text-white">
      <HomeContentEditor />
    </main>
  );
}
