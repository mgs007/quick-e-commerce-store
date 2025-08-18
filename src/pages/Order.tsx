import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/layout/SiteLayout";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "@/services/productService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/services/orderService";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Product } from "@/data/products";

const OrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const data = await getProductById(id);
        setProduct(data || null);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <SiteLayout>
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-center">Loading...</div>
        </section>
      </SiteLayout>
    );
  }

  if (!product) {
    return (
      <SiteLayout>
        <section className="max-w-7xl mx-auto px-4 py-10">
          <p>Product not found.</p>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <Helmet>
        <title>{`Order – ${product.name} | RangoDeco`}</title>
        <meta name="description" content={`Order ${product.name} for $${product.price}. No login required.`} />
        <link rel="canonical" href={`/order/${product.id}`} />
      </Helmet>

      <section className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-xl sm:text-2xl font-semibold mb-2">Order Form</h1>
        <p className="text-sm text-muted-foreground mb-6">Quick and easy. We'll contact you to confirm.</p>
        <div className="border rounded-lg p-4 sm:p-6 grid gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Product</div>
            <div className="font-medium">{product.name} – ${product.price.toFixed(2)}</div>
          </div>
          <form
            className="grid gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              await createOrder({
                productId: product.id,
                productName: product.name,
                productPrice: product.price,
                customerName: name,
                phone,
                location: location || undefined,
                preferredTime: time || undefined,
              });
              toast({ title: "Order placed!", description: "We'll reach out shortly." });
              navigate("/");
            }}
          >
            <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <Input placeholder="Location (optional)" value={location} onChange={(e) => setLocation(e.target.value)} />
            <Input placeholder="Preferred delivery time (optional)" value={time} onChange={(e) => setTime(e.target.value)} />
            <div className="flex flex-col sm:flex-row gap-3">
              <Button type="submit" className="flex-1">Submit Order</Button>
              <Button type="button" variant="secondary" className="flex-1" onClick={() => navigate(-1)}>Cancel</Button>
            </div>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
};

export default OrderPage;
