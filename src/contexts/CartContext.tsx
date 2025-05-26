"use client";

import { CartItem } from '@/types/cart';
import { createContext, useReducer, useContext, ReactNode, useEffect } from 'react'

type State = { items: CartItem[] }

type Action =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'INCREASE_ITEM'; payload: string }
  | { type: 'DECREASE_ITEM'; payload: string }

const CartContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
} | undefined>(undefined)

const initialState: State = { items: [] }

function cartReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) {
        return {
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        }
      }
      return { items: [...state.items, action.payload] }
    }

    case 'REMOVE_ITEM':
      return { items: state.items.filter(item => item.id !== action.payload) }

    case 'CLEAR_CART':
      return { items: [] }

    case 'INCREASE_ITEM':
      return {
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      }

    case 'DECREASE_ITEM':
      return {
        items: state.items.map(item =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      }

    default:
      return state
  }
}

const isBrowser = typeof window !== 'undefined'

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    if (!isBrowser) return initialState
    const stored = localStorage.getItem('cart')
    return stored ? JSON.parse(stored) : initialState
  })

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('cart', JSON.stringify(state))
    }
  }, [state])

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCartContext deve ser usado dentro de um CartProvider')
  return context
}
