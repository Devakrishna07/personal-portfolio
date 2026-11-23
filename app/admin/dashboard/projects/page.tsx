"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ProjectsContentEditor } from "@/components/admin/ProjectsContentEditor";

export default function AdminProjectsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        // If not authenticated and not in mock placeholder mode, redirect to /adminlogin
        if (!user && !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("placeholder")) {
          router.replace("/adminlogin");
          return;
        }
      } catch {
        router.replace("/adminlogin");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen w-full bg-[#000000] text-neutral-100 flex items-center justify-center font-mono text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span>VERIFYING ADMIN CREDENTIALS...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#000000] text-neutral-100 selection:bg-red-500 selection:text-white">
      <ProjectsContentEditor />
    </main>
  );
}
