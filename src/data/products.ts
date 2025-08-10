export type Category = "arts" | "electronics" | "furniture" | "crops";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  trending?: boolean;
  popular?: boolean;
}

// Seed products used as defaults (admin can add more later)
export const defaultProducts: Product[] = [
  {
    id: "p-art-1",
    name: "Handcrafted Canvas Art",
    slug: "handcrafted-canvas-art",
    price: 120,
    description: "Vibrant handmade canvas perfect for modern interiors.",
    images: ["/placeholder.svg"],
    category: "arts",
    trending: true,
  },
  {
    id: "p-elec-1",
    name: "Wireless Earbuds X2",
    slug: "wireless-earbuds-x2",
    price: 58,
    description: "Noise-cancelling earbuds with long-lasting battery.",
    images: ["/placeholder.svg"],
    category: "electronics",
    trending: true,
    popular: true,
  },
  {
    id: "p-furn-1",
    name: "Nordic Lounge Chair",
    slug: "nordic-lounge-chair",
    price: 240,
    description: "Comfort-first lounge chair with solid wood legs.",
    images: ["/placeholder.svg"],
    category: "furniture",
    popular: true,
  },
  {
    id: "p-crops-1",
    name: "Organic Honey (1L)",
    slug: "organic-honey-1l",
    price: 18,
    description: "Raw, unfiltered honey sourced from local farms.",
    images: ["/placeholder.svg"],
    category: "crops",
    trending: true,
  },
  {
    id: "p-elec-2",
    name: "Smart LED Bulb",
    slug: "smart-led-bulb",
    price: 12,
    description: "Energy-efficient bulb with app-controlled brightness.",
    images: ["/placeholder.svg"],
    category: "electronics",
  },
  {
    id: "p-furn-2",
    name: "Minimal Study Desk",
    slug: "minimal-study-desk",
    price: 150,
    description: "Space-saving desk with cable management.",
    images: ["/placeholder.svg"],
    category: "furniture",
  },
];
