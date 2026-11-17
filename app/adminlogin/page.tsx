import React from "react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login // Portfolio Access",
  description: "Secure administrator sign-in.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen w-full bg-[#000000] text-neutral-100 flex items-center justify-center p-4 selection:bg-red-500 selection:text-white">
      <AdminLoginForm />
    </main>
  );
}
