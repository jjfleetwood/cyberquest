export type ItemSlot = "head" | "body" | "hands" | "background";

export type ShopItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  slot: ItemSlot;
  emoji: string;
  rarity: "common" | "rare" | "legendary";
  /** SVG path/shape string used to render the item on the avatar silhouette */
  svgClass: string;
  adminOnly?: boolean;
};

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: "helmet-of-knowing",
    name: "Helmet of Knowing",
    description: "The headgear of those who have seen the matrix. Worn by operators who understand the stack.",
    price: 500,
    slot: "head",
    emoji: "🪖",
    rarity: "rare",
    svgClass: "item-helmet",
    adminOnly: true,
  },
  {
    id: "medallion-of-amazement",
    name: "Medallion of Amazement",
    description: "A gleaming medal awarded to those who dare to be amazing. Worn proudly on the chest.",
    price: 300,
    slot: "body",
    emoji: "🏅",
    rarity: "rare",
    svgClass: "item-medallion",
    adminOnly: true,
  },
];

export function getItem(id: string): ShopItem | undefined {
  return SHOP_ITEMS.find((i) => i.id === id);
}
