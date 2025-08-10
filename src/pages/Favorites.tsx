import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/layout/SiteLayout";
import { useStore } from "@/context/StoreContext";
import { getAllProducts } from "@/services/productService";
import ProductGrid from "@/components/store/ProductGrid";

const FavoritesPage = () => {
  const { favorites } = useStore();
  const products = getAllProducts().filter((p) => favorites.has(p.id));

  return (
    <SiteLayout>
      <Helmet>
        <title>Favorites – RangoStore</title>
        <meta name="description" content="Your favorite saved products." />
        <link rel="canonical" href="/favorites" />
      </Helmet>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">Favorites</h1>
        {products.length === 0 ? (
          <p className="text-muted-foreground">You have no favorites yet.</p>
        ) : (
          <ProductGrid products={products} />
        )}
      </section>
    </SiteLayout>
  );
};

export default FavoritesPage;
