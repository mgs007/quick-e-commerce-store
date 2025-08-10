import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/layout/SiteLayout";
import { useStore } from "@/context/StoreContext";
import { getAllProducts } from "@/services/productService";
import { Button } from "@/components/ui/button";

const CartPage = () => {
  const { cart, removeFromCart } = useStore();
  const products = getAllProducts();

  const items = cart.map((c) => ({
    ...c,
    product: products.find((p) => p.id === c.productId)!
  })).filter((i) => !!i.product);

  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  return (
    <SiteLayout>
      <Helmet>
        <title>Your Cart – RangoStore</title>
        <meta name="description" content="Review items in your cart and proceed to order." />
        <link rel="canonical" href="/cart" />
      </Helmet>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
        {items.length === 0 ? (
          <p className="text-muted-foreground">Your cart is empty.</p>
        ) : (
          <div className="space-y-3">
            {items.map((i) => (
              <div key={i.productId} className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={i.product.images[0]} alt={i.product.name} className="h-16 w-16 object-cover rounded" />
                  <div>
                    <div className="font-medium">{i.product.name}</div>
                    <div className="text-sm text-muted-foreground">Qty: {i.qty}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="font-semibold">${(i.product.price * i.qty).toFixed(2)}</div>
                  <Button variant="secondary" onClick={() => removeFromCart(i.productId)}>Remove</Button>
                  <a href={`/order/${i.productId}`}><Button>Order Now</Button></a>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between border-t pt-4">
              <div className="text-muted-foreground">Total</div>
              <div className="text-xl font-bold">${total.toFixed(2)}</div>
            </div>
          </div>
        )}
      </section>
    </SiteLayout>
  );
};

export default CartPage;
