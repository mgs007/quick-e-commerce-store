import { Product, Category } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";

// Cache for better performance
let productsCache: Product[] | null = null;
let lastFetch = 0;
const CACHE_DURATION = 30000; // 30 seconds

async function fetchFromSupabase(): Promise<Product[]> {
  const now = Date.now();
  if (productsCache && (now - lastFetch) < CACHE_DURATION) {
    return productsCache;
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return productsCache || [];
  }

  productsCache = (data || []) as Product[];
  lastFetch = now;
  return productsCache;
}

function clearCache() {
  productsCache = null;
  lastFetch = 0;
}

export async function getAllProducts(): Promise<Product[]> {
  return await fetchFromSupabase();
}

export async function getProductsByCategory(category: Category): Promise<Product[]> {
  const products = await fetchFromSupabase();
  return products.filter((p) => p.category === category);
}

export async function getTrending(): Promise<Product[]> {
  const products = await fetchFromSupabase();
  return products.filter((p) => p.trending);
}

export async function getPopular(): Promise<Product[]> {
  const products = await fetchFromSupabase();
  return products.filter((p) => p.popular);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await fetchFromSupabase();
  return products.find((p) => p.id === id);
}

export async function addProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();

  if (error) {
    console.error('Error adding product:', error);
    return null;
  }

  clearCache();
  return data as Product;
}

export async function updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    return null;
  }

  clearCache();
  return data as Product;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    return false;
  }

  clearCache();
  return true;
}

export async function uploadProductImage(file: File): Promise<string | null> {
  const fileName = `${Date.now()}-${file.name}`;
  
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file);

  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(data.path);

  return publicUrl;
}
