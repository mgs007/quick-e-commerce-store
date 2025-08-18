import { Product } from "@/data/products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "@/context/StoreContext";
import { toast } from "@/hooks/use-toast";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, toggleFavorite, favorites } = useStore();
  const isFav = favorites.has(product.id);
  return (
    <Card className="hover-scale shadow-elevate">
      <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
        <img
          src={product.images[0]}
          alt={`${product.name} product image`}
          className="w-full h-32 sm:h-40 object-cover rounded-t-lg"
          loading="lazy"
        />
      </Link>
      <CardHeader className="p-3 pb-2">
        <CardTitle className="text-sm leading-tight line-clamp-2">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8"
            aria-label="Add to Favorites"
            onClick={() => toggleFavorite(product.id)}
          >
            <Heart className={`h-3 w-3 ${isFav ? 'fill-current' : ''}`} />
          </Button>
        </div>
        <Button
          className="w-full"
          size="sm"
          onClick={() => {
            addToCart(product.id, 1);
            toast({ title: "Added to cart", description: product.name });
          }}
        >
          <ShoppingCart className="h-3 w-3 mr-1" /> Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
