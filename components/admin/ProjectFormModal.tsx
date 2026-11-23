"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Project } from "@/lib/portfolio/types";

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: Omit<Project, "id">, id?: string) => Promise<boolean>;
  initialData?: Project | null;
}

export function ProjectFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: ProjectFormModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [orderIndex, setOrderIndex] = useState(0);
  const [tagsInput, setTagsInput] = useState("");

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setImageUrl(initialData.image_url || "");
      setGithubUrl(initialData.github_url || "");
      setLiveUrl(initialData.live_url || "");
      setOrderIndex(initialData.order_index ?? 0);
      setTagsInput(Array.isArray(initialData.tags) ? initialData.tags.join(", ") : "");
    } else {
      setTitle("");
      setDescription("");
      setImageUrl("");
      setGithubUrl("");
      setLiveUrl("");
      setOrderIndex(0);
      setTagsInput("");
    }
    setErrorMsg(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setErrorMsg(null);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Upload failed");
      }

      setImageUrl(json.url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload file";
      setErrorMsg(msg);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg("Project title is required");
      return;
    }
    if (!description.trim()) {
      setErrorMsg("Project description is required");
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    const tagsArray = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const projectPayload: Omit<Project, "id"> = {
      title: title.trim(),
      description: description.trim(),
      image_url: imageUrl.trim(),
      github_url: githubUrl.trim() || undefined,
      live_url: liveUrl.trim() || undefined,
      order_index: Number(orderIndex) || 0,
      tags: tagsArray,
    };

    const success = await onSubmit(projectPayload, initialData?.id);
    setSubmitting(false);

    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0c0c0c] border border-neutral-800 shadow-2xl p-6 sm:p-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <h2 className="text-xl font-bold text-white">
              {initialData ? "Edit Project" : "Add New Project"}
            </h2>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">
              Syncs directly with Supabase projects table
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-lg bg-red-950/50 border border-red-800/80 text-red-300 text-xs font-mono">
            {errorMsg}
          </div>
        )}

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-mono text-neutral-300 mb-1.5">
              Project Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. NeuroMesh AI Studio"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-red-500/80 transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-mono text-neutral-300 mb-1.5">
              Short Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Describe what the project does, key architecture or impact..."
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-red-500/80 transition-colors resize-none"
            />
          </div>

          {/* Image Upload & Preview */}
          <div>
            <label className="block text-xs font-mono text-neutral-300 mb-1.5">
              Project Image Thumbnail
            </label>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Image Preview Box */}
              <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 shrink-0 flex items-center justify-center">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Preview"
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <span className="text-xs font-mono text-neutral-500">&lt;/&gt;</span>
                )}
              </div>

              {/* Upload Action and URL Input */}
              <div className="flex-1 w-full space-y-2">
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="px-3.5 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono transition-colors border border-neutral-700 disabled:opacity-50"
                  >
                    {uploading ? "Uploading..." : "Upload from Computer"}
                  </button>
                  {imageUrl && (
                    <button
                      type="button"
                      onClick={() => setImageUrl("")}
                      className="px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-red-400 text-xs font-mono transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Or paste image URL directly..."
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 placeholder-neutral-600 text-xs font-mono focus:outline-none focus:border-red-500/80"
                />
              </div>
            </div>
          </div>

          {/* External Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-red-500/80"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                Live Demo / Website URL
              </label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://myproject.com"
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-red-500/80"
              />
            </div>
          </div>

          {/* Display Order & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                Order Index
              </label>
              <input
                type="number"
                value={orderIndex}
                onChange={(e) => setOrderIndex(parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-red-500/80"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                Tags / Tech Stack (comma-separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Next.js, TypeScript, WebGL"
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-red-500/80"
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-neutral-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-mono transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || uploading}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-medium transition-colors disabled:opacity-50 shadow-md shadow-red-600/20"
            >
              {submitting ? "Saving..." : initialData ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
