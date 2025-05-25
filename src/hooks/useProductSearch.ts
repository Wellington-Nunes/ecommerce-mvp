import { Product } from "@/types/product";
import { useDebounce } from "use-debounce";
import { useMemo } from "react";

export const useProductSearch = (
  products: Product[],
  searchTerm: string,
  options?: {
    searchFields?: (keyof Product)[];
    debounce?: number;
  }
) => {
  const { searchFields = ["title", "description"], debounce = 0 } =
    options || {};
  const [debouncedSearchTerm] = useDebounce(searchTerm, debounce);

  return useMemo(() => {
    if (!debouncedSearchTerm) return products;

    const lowerTerm = debouncedSearchTerm.toLowerCase();
    return products.filter((product) =>
      searchFields.some((field) =>
        String(product[field]).toLowerCase().includes(lowerTerm)
      )
    );
  }, [products, debouncedSearchTerm, searchFields]);
};
