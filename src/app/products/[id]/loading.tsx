import { ProductDetailsSkeleton } from "@/components/products/ProductDetailsSkeleton";

export default function Loading() {
  return (
    <div className="container max-w-6xl mx-auto py-8">
      <ProductDetailsSkeleton />
    </div>
  );
}
