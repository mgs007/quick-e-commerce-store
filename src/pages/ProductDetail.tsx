import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/layout/SiteLayout";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getAllProducts, getProductById } from "@/services/productService";
import { Button } from "@/components/ui/button";
import { useStore } from "@/context/StoreContext";
import ProductGrid from "@/components/store/ProductGrid";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const navigate = useNavigate();
  const { addToCart } = useStore();

  if (!product) return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-4 py-10">
        <p>Product not found.</p>
      </section>
    </SiteLayout>
  );

  const recommended = getAllProducts().filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <SiteLayout>
      <Helmet>
        <title>{`RangoStore – ${product.name}`}</title>
        <meta name="description" content={product.description} />
        <link rel="canonical" href={`/product/${product.id}`} />
      </Helmet>

      <section className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
        <div>
          <div className="grid grid-cols-4 gap-2 order-2 md:order-none md:mb-3">
            {product.images.map((img, idx) => (
              <img key={idx} src={img} alt={`${product.name} image ${idx+1}`} className="w-full h-20 object-cover rounded" />
            ))}
          </div>
          <img src={product.images[0]} alt={`${product.name} main image`} className="w-full h-80 object-cover rounded-lg" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
          <div className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</div>
          <p className="text-muted-foreground mb-6">{product.description}</p>
          <div className="flex gap-3">
            <Button onClick={() => addToCart(product.id)}>Add to Cart</Button>
            <Button variant="secondary" onClick={() => navigate(`/order/${product.id}`)}>Order Now</Button>
          </div>
          <div className="mt-8">
            <h3 className="font-semibold mb-3">Recommended products</h3>
            <ProductGrid products={recommended} />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default ProductDetail;
