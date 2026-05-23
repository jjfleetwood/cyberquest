"use client";

import type { ShopItem } from "@/data/shop-items";

type EquippedMap = Record<string, string>; // slot -> itemId
type InventoryMap = Record<string, ShopItem>; // itemId -> ShopItem

type Props = {
  equipped: EquippedMap;
  itemsById: InventoryMap;
  size?: "sm" | "lg";
};

export default function Avatar({ equipped, itemsById, size = "lg" }: Props) {
  const dim = size === "lg" ? 300 : 120;
  const headItem = equipped.head ? itemsById[equipped.head] : null;
  const bodyItem = equipped.body ? itemsById[equipped.body] : null;
  const bgItem = equipped.background ? itemsById[equipped.background] : null;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: dim, height: dim }}
    >
      <svg
        viewBox="0 0 300 300"
        width={dim}
        height={dim}
        style={{ overflow: "visible" }}
      >
        {/* Background / aura layer */}
        {bgItem && (
          <circle cx="150" cy="150" r="130" fill="none" stroke="rgba(6,182,212,0.25)" strokeWidth="3">
            <animate attributeName="r" values="125;135;125" dur="3s" repeatCount="indefinite" />
          </circle>
        )}

        {/* Silhouette — cyber operative */}
        {/* Body glow */}
        <ellipse cx="150" cy="230" rx="60" ry="10" fill="rgba(6,182,212,0.08)" />

        {/* Legs */}
        <rect x="120" y="210" width="22" height="55" rx="8" fill="#1e293b" />
        <rect x="158" y="210" width="22" height="55" rx="8" fill="#1e293b" />
        {/* Boots */}
        <rect x="116" y="255" width="30" height="12" rx="5" fill="#0f172a" />
        <rect x="154" y="255" width="30" height="12" rx="5" fill="#0f172a" />

        {/* Torso */}
        <rect x="108" y="145" width="84" height="72" rx="12" fill="#1e293b" />
        {/* Torso detail lines */}
        <line x1="150" y1="148" x2="150" y2="215" stroke="rgba(6,182,212,0.2)" strokeWidth="1" />
        <line x1="108" y1="172" x2="192" y2="172" stroke="rgba(6,182,212,0.15)" strokeWidth="1" />

        {/* Arms */}
        <rect x="76" y="148" width="22" height="60" rx="8" fill="#1e293b" />
        <rect x="202" y="148" width="22" height="60" rx="8" fill="#1e293b" />
        {/* Gloves */}
        <rect x="74" y="200" width="26" height="18" rx="7" fill="#0f172a" />
        <rect x="200" y="200" width="26" height="18" rx="7" fill="#0f172a" />

        {/* Neck */}
        <rect x="138" y="120" width="24" height="30" rx="6" fill="#1e293b" />

        {/* Head */}
        <ellipse cx="150" cy="100" rx="42" ry="46" fill="#1e293b" />
        {/* Face visor */}
        <ellipse cx="150" cy="98" rx="30" ry="22" fill="#0f172a" />
        <ellipse cx="150" cy="98" rx="26" ry="18" fill="rgba(6,182,212,0.12)" />
        {/* Visor glow line */}
        <ellipse cx="150" cy="94" rx="20" ry="6" fill="none" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" />

        {/* Shoulder pads */}
        <ellipse cx="90" cy="152" rx="16" ry="10" fill="#334155" />
        <ellipse cx="210" cy="152" rx="16" ry="10" fill="#334155" />

        {/* ── Equipped items ── */}

        {/* HEAD slot — rendered above head */}
        {headItem?.id === "helmet-of-knowing" && (
          <g>
            <ellipse cx="150" cy="58" rx="44" ry="16" fill="#0ea5e9" opacity="0.9" />
            <rect x="106" y="58" width="88" height="10" rx="4" fill="#0284c7" />
          </g>
        )}

        {/* BODY slot */}
        {bodyItem?.id === "medallion-of-amazement" && (
          <g>
            {/* Medal ribbon */}
            <rect x="143" y="155" width="14" height="18" rx="2" fill="#7c3aed" />
            {/* Medal disc */}
            <circle cx="150" cy="182" r="14" fill="gold" />
            <circle cx="150" cy="182" r="10" fill="#fbbf24" />
            {/* Star in center */}
            <text x="150" y="187" textAnchor="middle" fontSize="12" fill="#92400e">★</text>
            {/* Shine */}
            <circle cx="145" cy="177" r="3" fill="rgba(255,255,255,0.4)" />
          </g>
        )}

        {/* Edge glow on body */}
        <rect x="108" y="145" width="84" height="72" rx="12" fill="none" stroke="rgba(6,182,212,0.15)" strokeWidth="1" />
        {/* Edge glow on head */}
        <ellipse cx="150" cy="100" rx="42" ry="46" fill="none" stroke="rgba(6,182,212,0.2)" strokeWidth="1" />
      </svg>
    </div>
  );
}
