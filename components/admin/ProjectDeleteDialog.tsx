"use client";

import React from "react";

interface ProjectDeleteDialogProps {
  isOpen: boolean;
  projectTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

export function ProjectDeleteDialog({
  isOpen,
  projectTitle,
  onConfirm,
  onCancel,
  isDeleting,
}: ProjectDeleteDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-md rounded-2xl bg-[#0c0c0c] border border-red-950/60 shadow-2xl p-6">
        <div className="flex items-center gap-3 text-red-500 mb-3">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-base font-bold text-white font-sans">
            Confirm Deletion
          </h3>
        </div>

        <p className="text-xs text-neutral-400 font-mono leading-relaxed">
          Are you sure you want to permanently delete{" "}
          <span className="text-white font-semibold">&quot;{projectTitle}&quot;</span>?
          This action will immediately remove the project from Supabase and the live portfolio.
        </p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-mono transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-medium transition-colors disabled:opacity-50 shadow-md shadow-red-600/20"
          >
            {isDeleting ? "Deleting..." : "Delete Permanently"}
          </button>
        </div>
      </div>
    </div>
  );
}
