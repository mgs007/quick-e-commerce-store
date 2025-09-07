import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/layout/SiteLayout";
import { useStore } from "@/context/StoreContext";
import { getAllProducts } from "@/services/productService";
import ProductGrid from "@/components/store/ProductGrid";
import { Product } from "@/data/products";

const FavoritesPage = () => {
  const { favorites } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts.filter((p) => favorites.has(p.id)));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [favorites]);

  return (
    <SiteLayout>
      <Helmet>
        <title>Favorites – RangoDeco</title>
        <meta name="description" content="Your favorite saved products." />
        <link rel="canonical" href="/favorites" />
      </Helmet>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">Favorites</h1>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : products.length === 0 ? (
          <p className="text-muted-foreground">You have no favorites yet.</p>
        ) : (
          <ProductGrid products={products} />
        )}
      </section>
    </SiteLayout>
  );
};

export default FavoritesPage;
