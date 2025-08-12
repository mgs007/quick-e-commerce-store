import { NavLink } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { Input } from "@/components/ui/input";
import { SITE } from "@/config/site";

const Header = () => {
  const { cartCount } = useStore();

  const navCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-primary" : "text-foreground/70 hover:text-foreground";

  return (
    <header className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-primary shadow-elevate" />
          <span className="font-semibold text-lg">{SITE.name}</span>
        </NavLink>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/category/arts" className={navCls}>Arts</NavLink>
          <NavLink to="/category/decorations" className={navCls}>Decorations</NavLink>
          <NavLink to="/category/furniture" className={navCls}>Furniture</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <Input placeholder="Search products" className="hidden md:block w-56" />
          <NavLink to="/favorites" className="relative p-2 rounded-md hover:bg-secondary">
            <Heart className="h-5 w-5" />
          </NavLink>
          <NavLink to="/cart" className="relative p-2 rounded-md hover:bg-secondary">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-xs bg-primary text-primary-foreground rounded-full h-5 min-w-5 px-1 grid place-items-center">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
