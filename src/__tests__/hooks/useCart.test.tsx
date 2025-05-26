import { renderHook, act } from "@testing-library/react";
import { useCart } from "@/hooks/useCart";
import { CartProvider } from "@/contexts/CartContext";

beforeAll(() => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const mockItem = {
  id: "1",
  title: "Camiseta Branca",
  price: 50,
  image: "image1.jpg"
};

describe("useCart", () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  describe("Funcionalidades básicas", () => {
    it("adiciona item corretamente", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockItem);
      });

      expect(result.current.items).toEqual([{ ...mockItem, quantity: 1 }]);
    });

    it("calcula total corretamente", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem({ ...mockItem, quantity: 2 });
        result.current.addItem({ ...mockItem, id: "2", price: 30 });
      });

      expect(result.current.total).toBe(50 * 2 + 30);
    });
  });

  describe("Manipulação de quantidades", () => {
    it("aumenta quantidade do item", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockItem);
        result.current.increaseItem("1");
      });

      expect(result.current.items[0].quantity).toBe(2);
    });

    it("diminui quantidade do item", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem({ ...mockItem, quantity: 3 });
        result.current.decreaseItem("1");
      });

      expect(result.current.items[0].quantity).toBe(2);
    });

    it("não diminui abaixo de 1", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockItem);
        result.current.decreaseItem("1");
      });

      expect(result.current.items[0].quantity).toBe(1);
    });
  });

  describe("Limpeza", () => {
    it("limpa carrinho completamente", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockItem);
        result.current.clearCart();
      });

      expect(result.current.items).toEqual([]);
    });
  });
});
