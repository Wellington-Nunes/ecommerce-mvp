import { renderHook } from "@testing-library/react";
import { useProductSearch } from "@/hooks/useProductSearch";
import { Product } from "@/types/product";

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Camiseta Branca",
    description: "Simples e elegante",
    price: 50,
    image: "image1.jpg",
    brand: "Marca A",
    model: "Modelo X",
    color: "Branco",
    category: "Roupas",
  },
  {
    id: 2,
    title: "Calça Jeans",
    description: "Confortável e resistente",
    price: 120,
    image: "image2.jpg",
    brand: "Marca B",
    model: "Modelo Y",
    color: "Azul",
    category: "Roupas",
  },
];

describe("useProductSearch", () => {
  describe("Comportamento básico", () => {
    it("retorna todos os produtos quando searchTerm está vazio", () => {
      const { result } = renderHook(() => useProductSearch(mockProducts, ""));
      expect(result.current).toEqual(mockProducts);
    });

    it("retorna array vazio quando nenhum produto corresponde", () => {
      const { result } = renderHook(() =>
        useProductSearch(mockProducts, "termo-inexistente")
      );
      expect(result.current).toEqual([]);
    });
  });

  describe("Filtragem por campos", () => {
    it("filtra produtos pelo título (case insensitive)", () => {
      const { result } = renderHook(() =>
        useProductSearch(mockProducts, "CAMISETA")
      );
      expect(result.current).toEqual([mockProducts[0]]);
    });

    it("filtra produtos pela descrição", () => {
      const { result } = renderHook(() =>
        useProductSearch(mockProducts, "resistente")
      );
      expect(result.current).toEqual([mockProducts[1]]);
    });
  });

  describe("Otimizações", () => {
    it("não recarrega resultados quando searchTerm não muda", () => {
      const { result, rerender } = renderHook(
        ({ term }) => useProductSearch(mockProducts, term),
        { initialProps: { term: "camiseta" } }
      );

      const firstResult = result.current;
      rerender({ term: "camiseta" });

      expect(result.current).toStrictEqual(firstResult);
    });
  });
});
