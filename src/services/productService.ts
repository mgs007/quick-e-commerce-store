import { defaultProducts, Product, Category } from "@/data/products";

const LS_KEY = "om_products";

function readCustom(): Product[] {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as Product[];
    return parsed;
  } catch {
    return [];
  }
}

function writeCustom(products: Product[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(products));
}

export function getAllProducts(): Product[] {
  // Merge defaults with custom-added products
  const custom = readCustom();
  // Prevent duplicates by id; prioritize custom edits
  const byId = new Map<string, Product>();
  [...defaultProducts, ...custom].forEach((p) => byId.set(p.id, p));
  return Array.from(byId.values());
}

export function getProductsByCategory(category: Category): Product[] {
  return getAllProducts().filter((p) => p.category === category);
}

export function getTrending(): Product[] {
  return getAllProducts().filter((p) => p.trending);
}

export function getPopular(): Product[] {
  return getAllProducts().filter((p) => p.popular);
}

export function getProductById(id: string): Product | undefined {
  return getAllProducts().find((p) => p.id === id);
}

export function addProduct(product: Product) {
  const custom = readCustom();
  custom.push(product);
  writeCustom(custom);
}

export function updateProduct(updated: Product) {
  const custom = readCustom();
  const idx = custom.findIndex((p) => p.id === updated.id);
  if (idx >= 0) {
    custom[idx] = updated;
  } else {
    custom.push(updated);
  }
  writeCustom(custom);
}
