import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/store/ProductGrid";
import CategoryPills from "@/components/store/CategoryPills";
import NewsletterForm from "@/components/store/NewsletterForm";
import { getTrending, getPopular } from "@/services/productService";
import { Link } from "react-router-dom";
import StoreDealsCarousel from "@/components/store/StoreDealsCarousel";

const Index = () => {
  const trending = getTrending();
  const popular = getPopular();

  return (
    <SiteLayout>
      <Helmet>
        <title>RangoDeco – Home & Office Decor, Furniture</title>
        <meta name="description" content="Shop arts, decorations, and furniture. Curated home and office decor deals." />
        <link rel="canonical" href="/" />
      </Helmet>

      {/* Hero Carousel */}
      <section className="relative">
        <StoreDealsCarousel />
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Browse Categories</h2>
          <CategoryPills />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { slug: "arts", label: "Arts" },
            { slug: "decorations", label: "Decorations" },
            { slug: "furniture", label: "Furniture" },
          ].map((c) => (
            <Link key={c.slug} to={`/category/${c.slug}`} className="group border rounded-lg p-5 hover:bg-secondary transition-colors">
              <div className="h-20 rounded bg-gradient-primary opacity-80 group-hover:opacity-100" />
              <div className="mt-3 font-medium">{c.label}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Trending Now</h2>
        <ProductGrid products={trending} />
      </section>

      {/* Popular */}
      {popular.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-xl font-semibold mb-4">Popular Picks</h2>
          <ProductGrid products={popular} />
        </section>
      )}

      {/* Newsletter */}
      <section id="newsletter" className="max-w-7xl mx-auto px-4 py-14">
        <div className="border rounded-xl p-6 md:p-8 bg-secondary">
          <div className="md:flex items-center justify-between gap-6">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Join our newsletter</h3>
              <p className="text-sm text-muted-foreground">Get promotions and exclusive offers straight to your inbox.</p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Index;
