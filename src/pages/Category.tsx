import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/layout/SiteLayout";
import { useParams, Link } from "react-router-dom";
import { getProductsByCategory } from "@/services/productService";
import ProductGrid from "@/components/store/ProductGrid";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: any }>();
  const products = getProductsByCategory((slug || "") as any);

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
        <ProductGrid products={products} />
      </section>
    </SiteLayout>
  );
};

export default CategoryPage;
