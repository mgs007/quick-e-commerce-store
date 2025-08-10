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
          className="w-full h-48 object-cover rounded-t-lg"
          loading="lazy"
        />
      </Link>
      <CardHeader className="pb-2">
        <CardTitle className="text-base line-clamp-1">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div>
          <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="icon"
            aria-label="Add to Favorites"
            onClick={() => toggleFavorite(product.id)}
          >
            <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
          </Button>
          <Button
            onClick={() => {
              addToCart(product.id, 1);
              toast({ title: "Added to cart", description: product.name });
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" /> Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
