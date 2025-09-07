export type Category = "arts" | "decorations" | "furniture";

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
    id: "p-decor-1",
    name: "Ceramic Vase Duo",
    slug: "ceramic-vase-duo",
    price: 45,
    description: "Minimal ceramic vases for home and office decor.",
    images: ["/placeholder.svg"],
    category: "decorations",
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
    id: "p-decor-2",
    name: "Framed Wall Art Set",
    slug: "framed-wall-art-set",
    price: 89,
    description: "Set of 3 abstract wall art prints with frames.",
    images: ["/placeholder.svg"],
    category: "decorations",
    trending: true,
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
  {
    id: "p-decor-3",
    name: "Office Desk Organizer",
    slug: "office-desk-organizer",
    price: 25,
    description: "Keeps pens, notes, and accessories tidy.",
    images: ["/placeholder.svg"],
    category: "decorations",
  },
];
