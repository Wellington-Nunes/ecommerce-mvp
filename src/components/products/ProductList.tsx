"use client";

import { useState, useMemo } from "react";
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

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          Anterior
        </button>

        <span>
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </>
  );
}
