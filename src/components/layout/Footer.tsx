const Footer = () => {
  return (
    <footer className="border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-6 w-6 rounded-md bg-gradient-primary" />
            <span className="font-semibold">OrangeMart</span>
          </div>
          <p className="text-sm text-muted-foreground">Your orange‑themed marketplace for trending products.</p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Categories</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li><a className="hover:text-foreground" href="/category/arts">Arts</a></li>
            <li><a className="hover:text-foreground" href="/category/electronics">Electronics</a></li>
            <li><a className="hover:text-foreground" href="/category/furniture">Furniture</a></li>
            <li><a className="hover:text-foreground" href="/category/crops">Crops</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">Get in touch</h4>
          <p className="text-sm text-muted-foreground">Promotions and offers straight to your inbox.</p>
        </div>
      </div>
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-muted-foreground flex items-center justify-between">
          <span>© {new Date().getFullYear()} OrangeMart. All rights reserved.</span>
          <a className="hover:text-foreground" href="/admin/login">Admin</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
