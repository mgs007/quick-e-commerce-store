import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/layout/SiteLayout";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "@/services/productService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/services/orderService";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const OrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : undefined;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");

  if (!product) return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-4 py-10"><p>Product not found.</p></section>
    </SiteLayout>
  );

  return (
    <SiteLayout>
      <Helmet>
        <title>{`Order – ${product.name} | RangoStore`}</title>
        <meta name="description" content={`Order ${product.name} for $${product.price}. No login required.`} />
        <link rel="canonical" href={`/order/${product.id}`} />
      </Helmet>

      <section className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-2">Order Form</h1>
        <p className="text-sm text-muted-foreground mb-6">Quick and easy. We'll contact you to confirm.</p>
        <div className="border rounded-lg p-6 grid gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Product</div>
            <div className="font-medium">{product.name} – ${product.price.toFixed(2)}</div>
          </div>
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              createOrder({
                productId: product.id,
                productName: product.name,
                productPrice: product.price,
                customerName: name,
                phone,
                location,
                preferredTime: time,
              });
              toast({ title: "Order placed!", description: "We'll reach out shortly." });
              navigate("/");
            }}
          >
            <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            <Input placeholder="Preferred delivery time (optional)" value={time} onChange={(e) => setTime(e.target.value)} />
            <div className="flex gap-3">
              <Button type="submit">Submit Order</Button>
              <Button type="button" variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
            </div>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
};

export default OrderPage;
