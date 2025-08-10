import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import OrderPage from "./pages/Order";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import CartPage from "./pages/Cart";
import FavoritesPage from "./pages/Favorites";
import { StoreProvider } from "./context/StoreContext";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <StoreProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/order/:id" element={<OrderPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<Dashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </StoreProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
