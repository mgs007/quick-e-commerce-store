import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/layout/SiteLayout";
import { useEffect, useState } from "react";
import { listOrders, markOrderProcessed } from "@/services/orderService";
import { addProduct, getAllProducts } from "@/services/productService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [authed, setAuthed] = useState(false);
  const [orders, setOrders] = useState(listOrders());

  // Product form
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState("electronics");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setAuthed(localStorage.getItem("om_admin_authed") === "1");
  }, []);

  if (!authed)
    return (
      <SiteLayout>
        <section className="max-w-7xl mx-auto px-4 py-10">
          <p>Unauthorized. Please <a className="underline" href="/admin/login">login</a>.</p>
        </section>
      </SiteLayout>
    );

  return (
    <SiteLayout>
      <Helmet>
        <title>Admin Dashboard – OrangeMart</title>
        <meta name="description" content="Manage products and view orders." />
        <link rel="canonical" href="/admin" />
      </Helmet>

      <section className="max-w-7xl mx-auto px-4 py-10 grid gap-10">
        <div>
          <h2 className="text-xl font-semibold mb-3">Incoming Orders</h2>
          <div className="space-y-3">
            {orders.length === 0 && (
              <p className="text-sm text-muted-foreground">No orders yet.</p>
            )}
            {orders.map((o) => (
              <div key={o.id} className="border rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{o.productName} – ${o.productPrice.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">{o.customerName} · {o.phone} · {o.location}</div>
                  {o.preferredTime && (
                    <div className="text-xs text-muted-foreground">Preferred: {o.preferredTime}</div>
                  )}
                  <div className="text-xs mt-1">Status: {o.status}</div>
                </div>
                {o.status !== "processed" && (
                  <Button onClick={() => { markOrderProcessed(o.id); setOrders(listOrders()); }}>Mark processed</Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Add Product</h2>
          <form
            className="grid md:grid-cols-2 gap-3 border rounded-lg p-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!name || price === "") return;
              addProduct({
                id: `custom-${Date.now()}`,
                name,
                slug: name.toLowerCase().replace(/\s+/g, "-"),
                price: Number(price),
                description: description || "",
                images: ["/placeholder.svg"],
                category: category as any,
              });
              setName(""); setPrice(""); setDescription("");
              alert("Product added (local only).");
            }}
          >
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input placeholder="Price" type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))} required />
            <Input placeholder="Category (arts, electronics, furniture, crops)" value={category} onChange={(e) => setCategory(e.target.value)} />
            <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <div className="md:col-span-2"><Button type="submit">Save Product</Button></div>
          </form>
          <p className="text-xs text-muted-foreground mt-2">Note: Local-only storage for now. Connect Supabase to persist and manage products properly.</p>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Dashboard;
