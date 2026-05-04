import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'dava_cart';

const initialState = {
  items: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item } = action;
      const existing = state.items.find(i => i.cartId === item.cartId);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.cartId === item.cartId
              ? { ...i, quantity: i.quantity + (item.quantity || 1) }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, item] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.cartId !== action.cartId) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(i =>
          i.cartId === action.cartId
            ? { ...i, quantity: Math.max(1, action.quantity) }
            : i
        ),
      };
    case 'UPDATE_AMOUNT':
      return {
        ...state,
        items: state.items.map(i =>
          i.cartId === action.cartId ? { ...i, amount: action.amount } : i
        ),
      };
    case 'CLEAR_CART':
      return initialState;
    case 'HYDRATE':
      return { ...state, items: action.items };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const items = JSON.parse(saved);
        if (Array.isArray(items)) dispatch({ type: 'HYDRATE', items });
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', item });
  const removeItem = (cartId) => dispatch({ type: 'REMOVE_ITEM', cartId });
  const updateQuantity = (cartId, quantity) => dispatch({ type: 'UPDATE_QUANTITY', cartId, quantity });
  const updateAmount = (cartId, amount) => dispatch({ type: 'UPDATE_AMOUNT', cartId, amount });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const totalItems = state.items.reduce((s, i) => s + (i.quantity || 1), 0);
  const totalAmount = state.items.reduce((s, i) => {
    const price = i.priceType === 'fixed' ? i.fixedPrice : i.amount;
    return s + price * (i.quantity || 1);
  }, 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      totalItems,
      totalAmount,
      addItem,
      removeItem,
      updateQuantity,
      updateAmount,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
