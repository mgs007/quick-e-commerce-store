import { SITE } from "@/config/site";

const Footer = () => {
  return (
    <footer className="border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-6 w-6 rounded-md bg-gradient-primary" />
            <span className="font-semibold">{SITE.name}</span>
          </div>
          <p className="text-sm text-muted-foreground">Home & office decorations and furniture for inspired spaces.</p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Categories</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li><a className="hover:text-foreground" href="/category/arts">Arts</a></li>
            <li><a className="hover:text-foreground" href="/category/decorations">Decorations</a></li>
            <li><a className="hover:text-foreground" href="/category/furniture">Furniture</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">Get in touch</h4>
          <p className="text-sm text-muted-foreground">Office: {SITE.contact.address}</p>
          <p className="text-sm text-muted-foreground">Phone: <a className="hover:text-foreground" href={`tel:${SITE.contact.phone}`}>{SITE.contact.phone}</a></p>
        </div>
      </div>
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-muted-foreground flex items-center justify-between">
          <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          <a className="hover:text-foreground" href="/admin/login">Admin</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
