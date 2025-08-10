import { Product } from "@/data/products";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductGrid;
