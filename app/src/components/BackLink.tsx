"use client";

import { useRouter } from "next/navigation";

export default function BackLink({ label = "← Back", className }: { label?: string; className?: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className={className ?? "text-gray-500 hover:text-cyan-400 text-sm mb-6 inline-block transition-colors"}
    >
      {label}
    </button>
  );
}
