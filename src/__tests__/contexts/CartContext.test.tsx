import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCartContext } from "@/contexts/CartContext";
import { CartItem } from "@/types/cart";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const mockItem: CartItem = {
  id: "1",
  title: "Camiseta Branca",
  price: 50,
  image: "image1.jpg",
  quantity: 1
};

describe("CartContext", () => {
  describe("Estado inicial", () => {
    it("inicia com carrinho vazio", () => {
      const { result } = renderHook(() => useCartContext(), { wrapper });
      expect(result.current.state.items).toEqual([]);
    });
  });

  describe("Ações básicas", () => {
    it("adiciona item ao carrinho", () => {
      const { result } = renderHook(() => useCartContext(), { wrapper });

      act(() => {
        result.current.dispatch({
          type: "ADD_ITEM",
          payload: mockItem
        });
      });

      expect(result.current.state.items).toEqual([mockItem]);
    });

    it("remove item do carrinho", () => {
      const { result } = renderHook(() => useCartContext(), { wrapper });

      act(() => {
        result.current.dispatch({ type: "ADD_ITEM", payload: mockItem });
      });

      act(() => {
        result.current.dispatch({ type: "REMOVE_ITEM", payload: "1" });
      });

      expect(result.current.state.items).toEqual([]);
    });
  });

  describe("Persistência", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it("carrega estado do localStorage na inicialização", () => {
      localStorage.setItem("cart", JSON.stringify({ items: [mockItem] }));
      
      const { result } = renderHook(() => useCartContext(), { wrapper });
      expect(result.current.state.items).toEqual([mockItem]);
    });

    it("atualiza localStorage quando o estado muda", () => {
      const { result } = renderHook(() => useCartContext(), { wrapper });

      act(() => {
        result.current.dispatch({ type: "ADD_ITEM", payload: mockItem });
      });

      expect(localStorage.getItem("cart")).toEqual(
        JSON.stringify({ items: [mockItem] })
      );
    });
  });
});