import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/layout/SiteLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { SITE } from "@/config/site";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState(SITE.adminEmail);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Login failed", description: error.message });
      return;
    }
    toast({ title: "Welcome", description: "Logged in successfully." });
    navigate("/admin");
  };

  return (
    <SiteLayout>
      <Helmet>
        <title>Admin Login – RangoDeco</title>
        <meta name="description" content="Secure admin login for RangoDeco." />
        <link rel="canonical" href="/admin/login" />
      </Helmet>

      <section className="max-w-md mx-auto px-4 py-16">
        <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
        <form className="grid gap-3" onSubmit={onSubmit}>
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" disabled={loading}>{loading ? "Signing in..." : "Login"}</Button>
        </form>
        <p className="text-xs text-muted-foreground mt-2">Use your admin credentials. Access is restricted to {SITE.adminEmail}.</p>
      </section>
    </SiteLayout>
  );
};

export default Login;
