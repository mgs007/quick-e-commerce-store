import { Helmet } from "react-helmet-async";
import hero from "@/assets/hero-orange.jpg";
import SiteLayout from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/store/ProductGrid";
import CategoryPills from "@/components/store/CategoryPills";
import NewsletterForm from "@/components/store/NewsletterForm";
import { getTrending, getPopular } from "@/services/productService";
import { Link } from "react-router-dom";

const Index = () => {
  const trending = getTrending();
  const popular = getPopular();

  return (
    <SiteLayout>
      <Helmet>
        <title>OrangeMart – Trending & Popular Products</title>
        <meta name="description" content="Shop trending products across Arts, Electronics, Furniture, and Crops. Orange-themed marketplace with great deals." />
        <link rel="canonical" href="/" />
      </Helmet>

      {/* Hero */}
      <section className="relative">
        <img src={hero} alt="Orange themed marketplace hero" className="w-full h-[360px] md:h-[420px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/10" />
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 flex items-center">
          <div className="max-w-xl animate-enter">
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight">Discover deals on products you love</h1>
            <p className="mt-3 text-muted-foreground">Explore arts, electronics, furniture, crops and more. No signup required.</p>
            <div className="mt-6 flex gap-3">
              <Link to="/category/electronics"><Button size="lg">Shop Electronics</Button></Link>
              <a href="#newsletter"><Button variant="secondary" size="lg">Get Offers</Button></a>
            </div>
          </div>
        </div>
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
            { slug: "electronics", label: "Electronics" },
            { slug: "furniture", label: "Furniture" },
            { slug: "crops", label: "Crops" },
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
