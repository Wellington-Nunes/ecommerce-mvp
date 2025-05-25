"use client";

import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { ProductSkeleton } from "./ProductListSkeleton";
import { useFilters } from "@/contexts/FiltersContext";
import { useProductSearch } from "@/hooks/useProductSearch";

type ProductListProps = {
  products: Product[];
  loading?: boolean;
  itemsPerPage?: number;
  searchFields?: (keyof Product)[];
};

export function ProductList({
  products,
  loading = false,
  itemsPerPage = 10,
  searchFields = ["title", "description"],
}: ProductListProps) {
  const { state } = useFilters();
  const filteredProducts = useProductSearch(products, state.searchTerm, {
    searchFields,
    debounce: 200,
  });

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: itemsPerPage }).map((_, index) => (
          <ProductSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (!filteredProducts.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum produto encontrado</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
