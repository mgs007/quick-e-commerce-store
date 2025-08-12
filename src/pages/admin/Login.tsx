import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/layout/SiteLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <SiteLayout>
      <Helmet>
        <title>Admin Login – RangoDeco</title>
        <meta name="description" content="Secure admin login for RangoDeco." />
        <link rel="canonical" href="/admin/login" />
      </Helmet>

      <section className="max-w-md mx-auto px-4 py-16">
        <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
        <form
          className="grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (password === "admin123") {
              localStorage.setItem("om_admin_authed", "1");
              navigate("/admin");
            } else {
              alert("Invalid password");
            }
          }}
        >
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit">Login</Button>
        </form>
        <p className="text-xs text-muted-foreground mt-2">Note: Proper authentication and secure access will be enabled after connecting Supabase.</p>
      </section>
    </SiteLayout>
  );
};

export default Login;
