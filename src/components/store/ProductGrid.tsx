import { Product } from "@/data/products";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid gap-3 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductGrid;
