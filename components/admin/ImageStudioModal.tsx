"use client";

import React, { useState } from "react";
import Image from "next/image";
import { upscaleImage2x } from "@/lib/image/upscaler";

interface ImageStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyAndUpload: (processedBlob: Blob, previewUrl: string) => Promise<void>;
}

export function ImageStudioModal({
  isOpen,
  onClose,
  onApplyAndUpload,
}: ImageStudioModalProps) {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [processedPreview, setProcessedPreview] = useState<string | null>(null);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);

  const [removeBgEnabled, setRemoveBgEnabled] = useState(true);
  const [upscaleEnabled, setUpscaleEnabled] = useState(true);

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalFile(file);
    const url = URL.createObjectURL(file);
    setOriginalPreview(url);
    setProcessedPreview(null);
    setProcessedBlob(null);
  };

  const handleProcessImage = async () => {
    if (!originalFile) return;

    setIsProcessing(true);
    setProcessingStatus("Initializing image AI pipeline...");

    try {
      let currentBlob: Blob = originalFile;

      // 1. Background Removal Step
      if (removeBgEnabled) {
        setProcessingStatus("Removing background with AI (WebAssembly)...");
        const { removeBackground } = await import("@imgly/background-removal");
        currentBlob = await removeBackground(currentBlob, {
          progress: (key, current, total) => {
            if (total > 0) {
              const pct = Math.round((current / total) * 100);
              setProcessingStatus(`Removing background: ${pct}%`);
            }
          },
        });
      }

      // 2. 2x Super-Resolution Upscaler Step
      if (upscaleEnabled) {
        setProcessingStatus("Upscaling resolution & sharpening (2x)...");
        currentBlob = await upscaleImage2x(currentBlob);
      }

      setProcessedBlob(currentBlob);
      const processedUrl = URL.createObjectURL(currentBlob);
      setProcessedPreview(processedUrl);
      setProcessingStatus("");
    } catch (err: unknown) {
      console.error("AI Image processing failed:", err);
      alert("AI Processing error. Make sure your browser supports WebAssembly.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApply = async () => {
    if (!processedBlob || !processedPreview) return;
    setIsUploading(true);
    try {
      await onApplyAndUpload(processedBlob, processedPreview);
      onClose();
    } catch (err: unknown) {
      console.error(err);
      alert("Failed to upload processed image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0a0a0a] border border-neutral-800 p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-800/80 flex items-center justify-center text-red-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-sans">
                AI Image Studio
              </h2>
              <p className="text-xs font-mono text-neutral-400">
                100% CLIENT-SIDE BACKGROUND REMOVER & 2X SMART UPSCALER
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* File Selector */}
        {!originalFile && (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-neutral-800 rounded-xl bg-neutral-950 hover:border-red-500/50 transition-colors text-center cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-white">Click or drag an image here</p>
            <p className="text-xs font-mono text-neutral-500 mt-1">Supports PNG, JPG, WEBP</p>
          </div>
        )}

        {/* Processing Controls & Side-by-Side Preview */}
        {originalFile && (
          <div className="space-y-6">
            {/* Toggles */}
            <div className="flex flex-wrap items-center gap-6 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <label className="flex items-center gap-2.5 text-xs font-mono text-neutral-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={removeBgEnabled}
                  onChange={(e) => setRemoveBgEnabled(e.target.checked)}
                  className="accent-red-500 w-4 h-4 rounded cursor-pointer"
                />
                <span>Remove Background (AI Transparent PNG)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs font-mono text-neutral-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={upscaleEnabled}
                  onChange={(e) => setUpscaleEnabled(e.target.checked)}
                  className="accent-red-500 w-4 h-4 rounded cursor-pointer"
                />
                <span>2x Smart AI Upscale & Sharpen</span>
              </label>

              <button
                type="button"
                onClick={handleProcessImage}
                disabled={isProcessing}
                className="ml-auto px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-semibold text-xs font-mono transition-colors flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Processing AI...</span>
                  </>
                ) : (
                  <span>Run AI Pipeline</span>
                )}
              </button>
            </div>

            {/* Status message */}
            {processingStatus && (
              <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-red-400 flex items-center gap-2 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                {processingStatus}
              </div>
            )}

            {/* Side-by-side Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Original */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-neutral-400">Original Upload:</span>
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
                  {originalPreview && (
                    <Image
                      src={originalPreview}
                      alt="Original"
                      fill
                      sizes="350px"
                      className="object-contain"
                    />
                  )}
                </div>
              </div>

              {/* Processed (Transparent checkerboard backing) */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-emerald-400">
                  Processed AI Output {processedPreview ? "(Transparent 2x)" : "(Pending Run)"}:
                </span>
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-neutral-800 bg-[linear-gradient(45deg,#171717_25%,transparent_25%),linear-gradient(-45deg,#171717_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#171717_75%),linear-gradient(-45deg,transparent_75%,#171717_75%)] bg-[size:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px]">
                  {processedPreview ? (
                    <Image
                      src={processedPreview}
                      alt="Processed AI Output"
                      fill
                      sizes="350px"
                      className="object-contain drop-shadow-2xl"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-neutral-500">
                      Click &quot;Run AI Pipeline&quot; to preview
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-neutral-800 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setOriginalFile(null);
              setOriginalPreview(null);
              setProcessedPreview(null);
              setProcessedBlob(null);
            }}
            disabled={!originalFile || isProcessing}
            className="text-xs font-mono text-neutral-400 hover:text-neutral-200 disabled:opacity-30 transition-colors"
          >
            Clear & Choose Another File
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-xs font-mono text-neutral-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={!processedBlob || isUploading}
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs font-mono transition-colors flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              {isUploading ? "Uploading to Supabase..." : "Apply & Upload to Supabase"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
