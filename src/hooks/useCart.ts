import { useCartContext } from "@/contexts/CartContext";
import { toast } from "./use-toast";

export function useCart() {
  const { state, dispatch } = useCartContext();

  const addItem = (item: {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity?: number;
  }) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { ...item, quantity: item.quantity ?? 1 },
    });

    toast({
      title: "Item adicionado",
      description: `${item.title} foi adicionado ao carrinho.`,
      duration: 3000,
    });
  };

  const removeItem = (id: string) =>
    dispatch({ type: "REMOVE_ITEM", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const increaseItem = (id: string) =>
    dispatch({ type: "INCREASE_ITEM", payload: id });
  const decreaseItem = (id: string) =>
    dispatch({ type: "DECREASE_ITEM", payload: id });

  const total = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const count = state.items.reduce((acc, item) => acc + item.quantity, 0);

  return {
    items: state.items,
    total,
    count,
    addItem,
    removeItem,
    clearCart,
    increaseItem,
    decreaseItem,
  };
}
