import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/layout/SiteLayout";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { SITE } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import ProductList from "@/components/admin/ProductList";

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
  const { t } = useLanguage();
  const [authed, setAuthed] = useState(false);
  const [orders, setOrders] = useState<OrderRow[]>([]);


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
          <p>{t('admin.unauthorized')} <a className="underline" href="/admin/login">{t('admin.login')}</a>.</p>
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
          <h2 className="text-xl font-semibold mb-3">{t('admin.orders')}</h2>
          <div className="space-y-3">
            {orders.length === 0 && (
              <p className="text-sm text-muted-foreground">{t('admin.no_orders')}</p>
            )}
            {orders.map((o) => (
              <div key={o.id} className="border rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{o.product_name} – {t('common.price')} {o.product_price.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">{[o.customer_name, o.phone, o.location ?? undefined].filter(Boolean).join(' · ')}</div>
                  {o.preferred_time && (
                    <div className="text-xs text-muted-foreground">Preferred: {o.preferred_time}</div>
                  )}
                  <div className="text-xs mt-1">{t('common.status')}: {o.status === 'processed' ? t('common.processed') : t('common.unprocessed')}</div>
                </div>
                {o.status !== "processed" && (
                  <Button onClick={() => markProcessed(o.id)}>{t('admin.mark_processed')}</Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <ProductList />
        </div>
      </section>
    </SiteLayout>
  );
};

export default Dashboard;
