import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/layout/SiteLayout";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { SITE } from "@/config/site";

interface OrderRow {
  id: string;
  product_name: string;
  product_price: number;
  customer_name: string;
  phone: string;
  location: string | null;
  preferred_time: string | null;
  status: string;
  created_at: string;
}

const Dashboard = () => {
  const [authed, setAuthed] = useState(false);
  const [orders, setOrders] = useState<OrderRow[]>([]);

  // Product form (local add remains for now)
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState("decorations");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const email = session?.user?.email ?? null;
      const isAdmin = email === SITE.adminEmail;
      setAuthed(!!isAdmin);
      if (isAdmin) fetchOrders(); else setOrders([]);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      const email = session?.user?.email ?? null;
      const isAdmin = email === SITE.adminEmail;
      setAuthed(!!isAdmin);
      if (isAdmin) fetchOrders();
    });
    return () => subscription.unsubscribe();
  }, []);

  async function fetchOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("id, product_name, product_price, customer_name, phone, location, preferred_time, status, created_at")
      .order("created_at", { ascending: false });
    if (!error && data) setOrders(data as OrderRow[]);
  }

  async function markProcessed(id: string) {
    const { error } = await supabase.from("orders").update({ status: "processed" }).eq("id", id);
    if (!error) fetchOrders();
  }

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
        <title>Admin Dashboard – RangoDeco</title>
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
                  <div className="font-medium">{o.product_name} – ${o.product_price.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">{[o.customer_name, o.phone, o.location ?? undefined].filter(Boolean).join(' · ')}</div>
                  {o.preferred_time && (
                    <div className="text-xs text-muted-foreground">Preferred: {o.preferred_time}</div>
                  )}
                  <div className="text-xs mt-1">Status: {o.status}</div>
                </div>
                {o.status !== "processed" && (
                  <Button onClick={() => markProcessed(o.id)}>Mark processed</Button>
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
              // Local placeholder until product management is wired to Supabase
              alert("Product management via Supabase coming soon.");
            }}
          >
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input placeholder="Price" type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))} required />
            <Input placeholder="Category (arts, decorations, furniture)" value={category} onChange={(e) => setCategory(e.target.value)} />
            <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <div className="md:col-span-2"><Button type="submit">Save Product</Button></div>
          </form>
          <p className="text-xs text-muted-foreground mt-2">Note: Use the database to manage products. Public can read products; only admin can modify.</p>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Dashboard;
