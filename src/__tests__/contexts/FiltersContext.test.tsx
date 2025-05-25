import { renderHook, act } from "@testing-library/react";
import { FiltersProvider, useFilters } from "@/contexts/FiltersContext";
import { useProductSearch } from "@/hooks/useProductSearch";
import { Product } from "@/types/product";

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <FiltersProvider>{children}</FiltersProvider>
);

const mockProducts: Product[] = [
    {
        id: 1,
        title: "Camiseta Branca",
        description: "Simples e elegante",
        price: 50,
        image: "camiseta-branca.jpg",
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
        image: "calca-jeans.jpg",
        brand: "Marca B",
        model: "Modelo Y",
        color: "Azul",
        category: "Roupas",
    },
];

describe("FiltersContext", () => {
    describe("Estado inicial", () => {
        it("inicia com searchTerm vazio", () => {
            const { result } = renderHook(() => useFilters(), { wrapper });
            expect(result.current.state.searchTerm).toBe("");
        });
    });

    describe("Atualizações de estado", () => {
        it("atualiza searchTerm corretamente", () => {
            const { result } = renderHook(() => useFilters(), { wrapper });

            act(() => {
                result.current.actions.setSearchTerm("teste");
            });

            expect(result.current.state.searchTerm).toBe("teste");
        });

        it("reseta searchTerm corretamente", () => {
            const { result } = renderHook(() => useFilters(), { wrapper });

            act(() => {
                result.current.actions.setSearchTerm("teste");
                result.current.actions.resetSearch();
            });

            expect(result.current.state.searchTerm).toBe("");
        });
    });

    describe("Otimizações", () => {
        it("mantém referência estável das actions", () => {
            const { result } = renderHook(() => useFilters(), { wrapper });
            const initialActions = result.current.actions;

            act(() => {
                result.current.actions.setSearchTerm("teste");
            });

            expect(result.current.actions).toStrictEqual(initialActions);
        });
    });

    describe("Integração", () => {
        it("integra corretamente com useProductSearch", () => {
            const { result: filters } = renderHook(() => useFilters(), { wrapper });

            act(() => {
                filters.current.actions.setSearchTerm("jeans");
            });

            const { result: search } = renderHook(() =>
                useProductSearch(mockProducts, filters.current.state.searchTerm),
                { wrapper }
            );

            expect(search.current).toEqual([mockProducts[1]]);
        });
    });
});
