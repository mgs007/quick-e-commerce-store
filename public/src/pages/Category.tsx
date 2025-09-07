import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/layout/SiteLayout";
import { useParams, Link } from "react-router-dom";
import { getProductsByCategory } from "@/services/productService";
import ProductGrid from "@/components/store/ProductGrid";
import { Product } from "@/data/products";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: any }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!slug) return;
      try {
        const data = await getProductsByCategory(slug as any);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [slug]);

  const title = `RangoDeco – ${String(slug).charAt(0).toUpperCase() + String(slug).slice(1)} Products`;

  return (
    <SiteLayout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`Browse ${slug} products with great prices.`} />
        <link rel="canonical" href={`/category/${slug}`} />
      </Helmet>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold capitalize">{slug} products</h1>
          <Link to="/" className="story-link relative">Back to Home</Link>
        </div>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <ProductGrid products={products} />
        )}
      </section>
    </SiteLayout>
  );
};

export default CategoryPage;
