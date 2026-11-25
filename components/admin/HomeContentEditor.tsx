"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getPortfolioContent, updatePortfolioContent } from "@/lib/portfolio/service";
import { DEFAULT_PORTFOLIO_CONTENT, PortfolioContent } from "@/lib/portfolio/types";
import { CropFrameSelector } from "@/components/admin/CropFrameSelector";
import { ImageStudioModal } from "@/components/admin/ImageStudioModal";

export function HomeContentEditor() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [rolesInput, setRolesInput] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [fit, setFit] = useState<"contain" | "cover">("contain");
  const [position, setPosition] = useState<"bottom-right" | "center" | "bottom-center" | "top">("bottom-right");
  const [scale, setScale] = useState(110);
  const [focalX, setFocalX] = useState(50);
  const [focalY, setFocalY] = useState(100);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [studioOpen, setStudioOpen] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function loadData() {
      const data = await getPortfolioContent();
      if (data) {
        populateForm(data);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const populateForm = (data: PortfolioContent) => {
    setName(data.hero_name);
    setRolesInput(data.hero_roles.join(", "));
    setImagePath(data.hero_image);
    setFit(data.hero_image_fit || "contain");
    setPosition(data.hero_image_position || "bottom-right");
    setScale(data.hero_image_scale ?? 110);
    setFocalX(data.hero_image_focal_x ?? 50);
    setFocalY(data.hero_image_focal_y ?? 100);
  };

  const rolesArray = rolesInput
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean);

  const handleSetDefault = () => {
    populateForm(DEFAULT_PORTFOLIO_CONTENT);
    setMessage({
      type: "success",
      text: "Form reset to default values. Click 'Save Home Content' to persist.",
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const result = await updatePortfolioContent({
      hero_name: name,
      hero_roles: rolesArray,
      hero_image: imagePath,
      hero_image_fit: fit,
      hero_image_position: position,
      hero_image_scale: scale,
      hero_image_focal_x: focalX,
      hero_image_focal_y: focalY,
    });

    setSaving(false);
    if (result.success) {
      setMessage({ type: "success", text: "Home hero section updated successfully!" });
      router.refresh();
    } else {
      setMessage({ type: "error", text: result.error || "Failed to update." });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-xs font-mono text-neutral-400">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2" />
        LOADING HOME CONTENT...
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10">
      {/* Header with breadcrumb */}
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
              Edit Home Page (Hero Section)
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
          Customize display name, glitch roles, Supabase image URL, and alignment positioning.
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
        {/* Name Input */}
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

        {/* Comma-separated Glitch Roles */}
        <div>
          <label className="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-2">
            Glitch Effect Roles (Comma-separated)
          </label>
          <input
            type="text"
            required
            value={rolesInput}
            onChange={(e) => setRolesInput(e.target.value)}
            placeholder="Developer, Creator, DevOps Engineer"
            className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors font-mono"
          />

          {/* Chips */}
          <div className="mt-3 flex flex-wrap gap-2">
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

        {/* Hero Image & Supabase S3 Upload */}
        <div>
          <label className="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-2">
            Hero Section Image (Supabase S3 Storage / URL)
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
            <button
              type="button"
              onClick={() => setStudioOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-xs font-mono transition-all shrink-0 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.35)]"
            >
              <span>✨ AI Image Studio</span>
            </button>
            <label className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono text-neutral-200 cursor-pointer transition-colors shrink-0">
              <span>{uploading ? "Uploading..." : "Direct Upload"}</span>
              <input
                type="file"
                accept="image/*"
                disabled={uploading}
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
          <span className="text-[11px] font-mono text-neutral-500 mt-1.5 block">
            Click <strong>&quot;✨ AI Image Studio&quot;</strong> to remove background & upscale 2x before saving, or upload directly.
          </span>
        </div>

        {/* Alignment & Position Controls */}
        <div className="pt-4 border-t border-neutral-800 space-y-5">
          <h3 className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold">
            Image Alignment & Positioning Controls
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Object Fit */}
            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                Object Fit
              </label>
              <select
                value={fit}
                onChange={(e) => setFit(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs font-mono focus:outline-none focus:border-red-500"
              >
                <option value="contain">Contain (Full Image Preserved)</option>
                <option value="cover">Cover (Fill & Select Crop Frame)</option>
              </select>
            </div>

            {/* Position */}
            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                Alignment Position
              </label>
              <select
                value={position}
                disabled={fit === "cover"}
                onChange={(e) => setPosition(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs font-mono focus:outline-none focus:border-red-500 disabled:opacity-40"
              >
                <option value="bottom-right">Bottom Right (Default)</option>
                <option value="center">Center</option>
                <option value="bottom-center">Bottom Center</option>
                <option value="top">Top</option>
              </select>
            </div>

            {/* Scale Multiplier */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-mono text-neutral-400">Scale Size</label>
                <span className="text-xs font-mono text-red-400">{scale}%</span>
              </div>
              <input
                type="range"
                min="80"
                max="140"
                step="5"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full accent-red-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Interactive Visual Crop Frame when fit is 'cover' */}
          {fit === "cover" && (
            <div className="mt-4 pt-4 border-t border-neutral-800/80">
              <CropFrameSelector
                imageUrl={imagePath || "/deva-mood.png"}
                focalX={focalX}
                focalY={focalY}
                aspectRatioLabel="Hero Desktop Split (1:1)"
                aspectRatioClass="aspect-square"
                onChange={(x, y) => {
                  setFocalX(x);
                  setFocalY(y);
                }}
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
          <Link
            href="/"
            target="_blank"
            className="text-xs font-mono text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            Preview Live Site ↗
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Save Home Content"}
          </button>
        </div>
      </form>

      {/* AI Image Studio Modal */}
      <ImageStudioModal
        isOpen={studioOpen}
        onClose={() => setStudioOpen(false)}
        onApplyAndUpload={async (processedBlob) => {
          const formData = new FormData();
          formData.append("file", processedBlob, "ai_processed_hero.png");
          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          if (data.url) {
            setImagePath(data.url);
            setMessage({
              type: "success",
              text: "AI background removed & 2x upscaled! Uploaded to Supabase Storage.",
            });
          } else {
            alert(data.error || "Upload failed");
          }
        }}
      />
    </div>
  );
}
