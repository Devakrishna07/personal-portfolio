"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/portfolio/types";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/lib/portfolio/service";
import { ProjectFormModal } from "./ProjectFormModal";
import { ProjectDeleteDialog } from "./ProjectDeleteDialog";

function CodePlaceholderIcon() {
  return (
    <svg
      className="w-6 h-6 text-red-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function ProjectsContentEditor() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const showNotification = (type: "success" | "error", text: string) => {
    setNotification({ type, text });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
    } catch {
      showNotification("error", "Failed to load projects from Supabase");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenAddModal = () => {
    setEditingProject(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (project: Project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleSaveProject = async (
    payload: Omit<Project, "id">,
    id?: string
  ): Promise<boolean> => {
    if (id) {
      // Update existing project
      const res = await updateProject(id, payload);
      if (!res.success) {
        showNotification("error", res.error || "Update failed");
        return false;
      }
      showNotification("success", "Project updated successfully");
    } else {
      // Create new project
      const res = await createProject(payload);
      if (!res.success) {
        showNotification("error", res.error || "Creation failed");
        return false;
      }
      showNotification("success", "Project added successfully");
    }

    await loadProjects();
    return true;
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      const res = await deleteProject(deleteTarget.id);
      if (!res.success) {
        showNotification("error", res.error || "Deletion failed");
        return;
      }
      showNotification("success", `"${deleteTarget.title}" deleted successfully`);
      setDeleteTarget(null);
      await loadProjects();
    } catch {
      showNotification("error", "Failed to delete project");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-neutral-800 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Link
              href="/admin/dashboard"
              className="text-xs font-mono text-neutral-400 hover:text-white transition-colors"
            >
              ← Dashboard
            </Link>
            <span className="text-neutral-600">/</span>
            <span className="text-xs font-mono text-red-400 font-semibold">
              Projects Manager
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
            Manage Portfolio Projects
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Create, update, or remove projects stored in Supabase
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/#projects"
            target="_blank"
            className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-mono transition-colors"
          >
            Preview Live ↗
          </Link>
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-medium transition-colors shadow-lg shadow-red-600/20 flex items-center gap-1.5"
          >
            <span>+</span> Add New Project
          </button>
        </div>
      </div>

      {/* Dynamic Alert Banner */}
      {notification && (
        <div
          className={`mt-6 p-4 rounded-xl border text-xs font-mono flex items-center justify-between ${
            notification.type === "success"
              ? "bg-emerald-950/40 border-emerald-800/80 text-emerald-300"
              : "bg-red-950/40 border-red-800/80 text-red-300"
          }`}
        >
          <span>{notification.text}</span>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-neutral-400 hover:text-white ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* Projects Grid / List */}
      <div className="mt-8">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-xs font-mono text-neutral-500">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping mb-3" />
            Loading projects from Supabase...
          </div>
        ) : projects.length === 0 ? (
          <div className="py-20 text-center rounded-2xl border border-dashed border-neutral-800 p-8">
            <p className="text-sm font-mono text-neutral-400 mb-4">
              No projects found in the database.
            </p>
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-medium transition-colors"
            >
              Add Your First Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="group relative rounded-2xl bg-[#080808] border border-neutral-800/80 hover:border-neutral-700 p-6 flex flex-col justify-between transition-all duration-200 shadow-md"
              >
                <div>
                  {/* Top Thumbnail & Order Index Badge */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                      Order: #{proj.order_index}
                    </span>

                    <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 shrink-0 flex items-center justify-center">
                      {proj.image_url ? (
                        <Image
                          src={proj.image_url}
                          alt={proj.title}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : (
                        <CodePlaceholderIcon />
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-white mb-2 line-clamp-1">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3 mb-4">
                    {proj.description}
                  </p>

                  {/* Tags */}
                  {proj.tags && proj.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800/60 text-neutral-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {proj.github_url && (
                      <a
                        href={proj.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-mono text-neutral-500 hover:text-white transition-colors"
                      >
                        GitHub ↗
                      </a>
                    )}
                    {proj.live_url && (
                      <a
                        href={proj.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-mono text-red-400 hover:text-red-300 transition-colors"
                      >
                        Live ↗
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(proj)}
                      className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-mono transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(proj)}
                      className="px-2.5 py-1 rounded-lg bg-red-950/40 hover:bg-red-900/40 border border-red-900/60 text-red-400 hover:text-red-300 text-xs font-mono transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <ProjectFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSaveProject}
        initialData={editingProject}
      />

      {/* Delete Confirmation Modal */}
      <ProjectDeleteDialog
        isOpen={Boolean(deleteTarget)}
        projectTitle={deleteTarget?.title || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        isDeleting={isDeleting}
      />
    </div>
  );
}
