"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getPortfolioContent, updatePortfolioContent } from "@/lib/portfolio/service";
import { DEFAULT_PORTFOLIO_CONTENT, PortfolioContent } from "@/lib/portfolio/types";

export function AboutContentEditor() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [rolesInput, setRolesInput] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [fit, setFit] = useState<"cover" | "contain">("cover");
  const [position, setPosition] = useState<"top" | "center" | "bottom">("top");
  const [location, setLocation] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [bio, setBio] = useState("");

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function loadData() {
      const data = await getPortfolioContent();
      populateForm(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const populateForm = (data: PortfolioContent) => {
    setName(data.about_name);
    setRolesInput(data.about_roles.join(", "));
    setImagePath(data.about_image);
    setFit(data.about_image_fit || "cover");
    setPosition(data.about_image_position || "top");
    setLocation(data.about_location);
    setRoleTitle(data.about_role_title);
    setEmail(data.about_email);
    setLinkedin(data.about_linkedin);
    setGithub(data.about_github);
    setBio(data.about_bio);
  };

  const handleSetDefault = () => {
    populateForm(DEFAULT_PORTFOLIO_CONTENT);
    setMessage({
      type: "success",
      text: "Form reset to default values. Click 'Save About Content' to persist.",
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setImagePath(data.url);
        setMessage({ type: "success", text: "Image uploaded to Supabase Storage!" });
      } else {
        setMessage({ type: "error", text: data.error || "Upload failed." });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to upload image." });
    } finally {
      setUploading(false);
    }
  };

  const rolesArray = rolesInput
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const result = await updatePortfolioContent({
      about_name: name,
      about_roles: rolesArray,
      about_image: imagePath,
      about_image_fit: fit,
      about_image_position: position,
      about_location: location,
      about_role_title: roleTitle,
      about_email: email,
      about_linkedin: linkedin,
      about_github: github,
      about_bio: bio,
    });

    setSaving(false);
    if (result.success) {
      setMessage({ type: "success", text: "About Me content updated successfully!" });
      router.refresh();
    } else {
      setMessage({ type: "error", text: result.error || "Failed to update." });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-xs font-mono text-neutral-400">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2" />
        LOADING ABOUT CONTENT...
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-neutral-200 transition-colors mb-4"
        >
          <span>←</span> Back to Dashboard
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
              Edit About Me Section
            </h1>
          </div>

          <button
            type="button"
            onClick={handleSetDefault}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
          >
            Reset to Default
          </button>
        </div>
        <p className="text-xs font-mono text-neutral-400 mt-1">
          Update profile photo, image alignment, glitch role switcher, and contact links.
        </p>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-xl text-xs font-mono border ${
            message.type === "success"
              ? "bg-emerald-950/40 border-emerald-800 text-emerald-300"
              : "bg-red-950/40 border-red-800 text-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Editor Form */}
      <form onSubmit={handleSave} className="space-y-6 rounded-2xl bg-[#080808] border border-neutral-800 p-6 sm:p-8">
        {/* Name & Role Title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-2">
              Display Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Deva Prasad NR"
              className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-2">
              Role Title (Info Grid)
            </label>
            <input
              type="text"
              required
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              placeholder="Full Stack & Creative Dev"
              className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
            />
          </div>
        </div>

        {/* Comma-separated Glitch Words */}
        <div>
          <label className="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-2">
            Glitch Roles (Comma-separated)
          </label>
          <input
            type="text"
            required
            value={rolesInput}
            onChange={(e) => setRolesInput(e.target.value)}
            placeholder="Developer, Designer, Creator, Engineer"
            className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors font-mono"
          />

          {/* Chips */}
          <div className="mt-2.5 flex flex-wrap gap-2">
            {rolesArray.map((role, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-950/40 border border-red-800/60 text-xs font-mono text-red-400"
              >
                <span>#{idx + 1}</span> {role}
              </span>
            ))}
          </div>
        </div>

        {/* About Image Path & Supabase Upload */}
        <div>
          <label className="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-2">
            About Framed Image (Supabase S3 Storage / URL)
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              value={imagePath}
              onChange={(e) => setImagePath(e.target.value)}
              placeholder="https://...supabase.co/storage/v1/object/public/portfolio-assets/..."
              className="flex-1 px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors font-mono"
            />
            <label className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-red-950/50 hover:bg-red-900/50 border border-red-700/60 text-xs font-mono text-red-300 cursor-pointer transition-colors shrink-0">
              <span>{uploading ? "Uploading..." : "Upload to Supabase Storage"}</span>
              <input
                type="file"
                accept="image/*"
                disabled={uploading}
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>

        {/* Alignment & Position Controls */}
        <div className="pt-4 border-t border-neutral-800 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold">
            About Frame Image Alignment & Crop Focus
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                Crop Focus Position
              </label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs font-mono focus:outline-none focus:border-red-500"
              >
                <option value="top">Top (Face / Head Focus)</option>
                <option value="center">Center</option>
                <option value="bottom">Bottom</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                Object Fit
              </label>
              <select
                value={fit}
                onChange={(e) => setFit(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs font-mono focus:outline-none focus:border-red-500"
              >
                <option value="cover">Cover (Fill Frame Entirely)</option>
                <option value="contain">Contain (Full Image Visible)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-2">
              Location / Place
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Karnataka, India"
              className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="devaprasadnr@gmail.com"
              className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
            />
          </div>
        </div>

        {/* LinkedIn & GitHub Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-2">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-2">
              GitHub Profile URL
            </label>
            <input
              type="url"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="https://github.com/yourprofile"
              className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors font-mono"
            />
          </div>
        </div>

        {/* Bio Paragraph */}
        <div>
          <label className="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-2">
            Biography Paragraph (~160 words)
          </label>
          <textarea
            rows={6}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm leading-relaxed focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors font-sans"
          />
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
          <Link
            href="/#about"
            target="_blank"
            className="text-xs font-mono text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            Preview About Section ↗
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Save About Content"}
          </button>
        </div>
      </form>
    </div>
  );
}
