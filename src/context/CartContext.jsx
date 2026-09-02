import { createContext, useContext, useReducer, useEffect } from 'react';
import { cartApi } from '../services/api';

const CartContext = createContext(null);

const STORAGE_KEY = 'dava_cart';

const initialState = {
  items: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item } = action;
      // Try to find by exact cartId first
      let existing = state.items.find(i => i.cartId && item.cartId && i.cartId === item.cartId);
      if (!existing) {
        // Fallback: match by donation id and unit price (so repeated adds increase quantity)
        existing = state.items.find(i => {
          const sameDonation = (i.id && item.id) ? String(i.id) === String(item.id) : false;
          const priceI = i.priceType === 'fixed' ? i.fixedPrice : i.amount;
          const priceItem = item.priceType === 'fixed' ? item.fixedPrice : item.amount;
          const samePrice = (priceI !== undefined && priceItem !== undefined) ? Number(priceI) === Number(priceItem) : false;
          return sameDonation && samePrice;
        });
      }

      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            (i.cartId && item.cartId && i.cartId === item.cartId) || (i.id && item.id && String(i.id) === String(item.id) && ((i.priceType === 'fixed' ? i.fixedPrice : i.amount) === (item.priceType === 'fixed' ? item.fixedPrice : item.amount)))
              ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) }
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
    let mounted = true;
    async function hydrate() {
      // Try server-backed cart first if API is configured
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        if (apiUrl) {
            const data = await cartApi.getCart();
            const rawItems = Array.isArray(data.items) ? data.items : (data.results || data || []);
            try {
              const metaJson = localStorage.getItem('dava_donation_meta');
              const meta = metaJson ? JSON.parse(metaJson) : {};
              const normalize = (it) => {
                const cartIdFromServer = it.cart_item_id || it.cartItemId || it.id || it.cart_id || (it.cart && it.cart.id) || null;
                const title = it.name || it.title || it.donation_title || it.name || '';
                const category = it.category || it.donation_category || '';
                const unit = it.unit_price || it.unit_amount || it.item_amount || (it.total_price && it.quantity ? Number(it.total_price) / Number(it.quantity || 1) : null) || null;
                const qty = it.quantity || 1;
                const amount = it.total_price != null ? it.total_price : (unit != null ? unit * qty : null);
                const mapped = {
                  cartId: cartIdFromServer,
                  cart_item_id: cartIdFromServer,
                  id: it.donation_id || it.donation?.id || null,
                  title,
                  category,
                  amount: unit,
                  fixedPrice: unit,
                  priceType: 'custom',
                  quantity: qty,
                  total_price: amount,
                  raw: it,
                };
                if (cartIdFromServer && meta[cartIdFromServer]) {
                  return { ...mapped, title: mapped.title || meta[cartIdFromServer].title, category: mapped.category || meta[cartIdFromServer].category, emoji: meta[cartIdFromServer].emoji };
                }
                const donationIdKey = mapped.id ? String(mapped.id) : null;
                if (donationIdKey && meta[donationIdKey]) {
                  return { ...mapped, title: mapped.title || meta[donationIdKey].title, category: mapped.category || meta[donationIdKey].category, emoji: meta[donationIdKey].emoji };
                }
                return mapped;
              };
              const items = (rawItems || []).map(normalize);
              if (mounted) dispatch({ type: 'HYDRATE', items });
              return;
            } catch (e) {
              const items = Array.isArray(data.items) ? data.items : (data.results || data || []);
              if (mounted) dispatch({ type: 'HYDRATE', items });
              return;
            }
        }
      } catch (err) {
        // fallback to localStorage
        console.error('Server cart hydrate failed, falling back to localStorage', err);
      }

      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const items = JSON.parse(saved);
          if (Array.isArray(items) && mounted) dispatch({ type: 'HYDRATE', items });
        }
      } catch (e) {
        // ignore
      }
    }
    hydrate();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addItem = async (item) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      if (apiUrl) {
        const totalPrice = item.amount || (item.priceType === 'fixed' ? item.fixedPrice : 0);
        const unitPrice = item.priceType === 'fixed' ? (item.fixedPrice || totalPrice) : (item.unit_price || totalPrice);
        const payload = {
          donation_id: item.id || item.donation_id,
          quantity: item.quantity || 1,
          price: totalPrice,        // total amount for the cart line
          unit_price: unitPrice,    // explicit unit price to avoid backend recalc surprises
          name: item.title || item.name,
          description: item.description || item.title || undefined,
          category: item.category || undefined,
        };
        const addResp = await cartApi.addToCart(payload);
        // if backend returned cart_item_id, copy local metadata (keyed by donation id) to that cart id
        try {
          const cartItemId = addResp && (addResp.cart_item_id || addResp.cartItemId || addResp.id);
          const metaJson = localStorage.getItem('dava_donation_meta');
          const meta = metaJson ? JSON.parse(metaJson) : {};
          const donationKey = String(item.id || item.slug || item.donation_id || '');
          if (cartItemId && donationKey && meta[donationKey]) {
            meta[cartItemId] = meta[donationKey];
            localStorage.setItem('dava_donation_meta', JSON.stringify(meta));
          }
        } catch (e) {
          // ignore
        }

        const data = await cartApi.getCart();
        let rawItems = Array.isArray(data.items) ? data.items : (data.results || data || []);
        // Normalize server items to frontend-friendly shape and augment with client-side metadata
        try {
          const metaJson = localStorage.getItem('dava_donation_meta');
          const meta = metaJson ? JSON.parse(metaJson) : {};
          const normalize = (it) => {
            const cartIdFromServer = it.cart_item_id || it.cartItemId || it.id || it.cart_id || (it.cart && it.cart.id) || null;
            const title = it.name || it.title || it.donation_title || it.name || '';
            const category = it.category || it.donation_category || '';
            const unit = it.unit_price || it.unit_amount || it.item_amount || (it.total_price && it.quantity ? Number(it.total_price) / Number(it.quantity || 1) : null) || null;
            const qty = it.quantity || 1;
            const amount = it.total_price != null ? it.total_price : (unit != null ? unit * qty : null);
            const mapped = {
              cartId: cartIdFromServer,
              cart_item_id: cartIdFromServer,
              id: it.donation_id || it.donation?.id || null,
              title,
              category,
              amount: unit,
              fixedPrice: unit,
              priceType: 'custom',
              quantity: qty,
              total_price: amount,
              raw: it,
            };
            // apply metadata if present either by cart id or by donation id
            if (cartIdFromServer && meta[cartIdFromServer]) {
              return { ...mapped, title: mapped.title || meta[cartIdFromServer].title, category: mapped.category || meta[cartIdFromServer].category, emoji: meta[cartIdFromServer].emoji };
            }
            const donationIdKey = mapped.id ? String(mapped.id) : null;
            if (donationIdKey && meta[donationIdKey]) {
              return { ...mapped, title: mapped.title || meta[donationIdKey].title, category: mapped.category || meta[donationIdKey].category, emoji: meta[donationIdKey].emoji };
            }
            return mapped;
          };
          const items = (rawItems || []).map(normalize);
          dispatch({ type: 'HYDRATE', items });
        } catch (e) {
          // fallback: dispatch raw server items
          const items = Array.isArray(data.items) ? data.items : (data.results || data || []);
          dispatch({ type: 'HYDRATE', items });
        }
        return;
      }
    } catch (err) {
      console.error('addItem API failed, falling back to local reducer', err);
    }
    dispatch({ type: 'ADD_ITEM', item });
  };

  const removeItem = async (cartId) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      if (apiUrl) {
        await cartApi.removeItem({ item_id: cartId });
        const data = await cartApi.getCart();
        const rawItems = Array.isArray(data.items) ? data.items : (data.results || data || []);
        try {
          const metaJson = localStorage.getItem('dava_donation_meta');
          const meta = metaJson ? JSON.parse(metaJson) : {};
          const normalize = (it) => {
            const cartIdFromServer = it.cart_item_id || it.cartItemId || it.id || it.cart_id || (it.cart && it.cart.id) || null;
            const title = it.name || it.title || it.donation_title || it.name || '';
            const category = it.category || it.donation_category || '';
            const unit = it.unit_price || it.unit_amount || it.item_amount || (it.total_price && it.quantity ? Number(it.total_price) / Number(it.quantity || 1) : null) || null;
            const qty = it.quantity || 1;
            const amount = it.total_price != null ? it.total_price : (unit != null ? unit * qty : null);
            const mapped = {
              cartId: cartIdFromServer,
              cart_item_id: cartIdFromServer,
              id: it.donation_id || it.donation?.id || null,
              title,
              category,
              amount: unit,
              fixedPrice: unit,
              priceType: 'custom',
              quantity: qty,
              total_price: amount,
              raw: it,
            };
            if (cartIdFromServer && meta[cartIdFromServer]) {
              return { ...mapped, title: mapped.title || meta[cartIdFromServer].title, category: mapped.category || meta[cartIdFromServer].category, emoji: meta[cartIdFromServer].emoji };
            }
            const donationIdKey = mapped.id ? String(mapped.id) : null;
            if (donationIdKey && meta[donationIdKey]) {
              return { ...mapped, title: mapped.title || meta[donationIdKey].title, category: mapped.category || meta[donationIdKey].category, emoji: meta[donationIdKey].emoji };
            }
            return mapped;
          };
          const items = (rawItems || []).map(normalize);
          dispatch({ type: 'HYDRATE', items });
        } catch (e) {
          const items = Array.isArray(data.items) ? data.items : (data.results || data || []);
          dispatch({ type: 'HYDRATE', items });
        }
        return;
      }
    } catch (err) {
      console.error('removeItem API failed, falling back to local reducer', err);
    }
    dispatch({ type: 'REMOVE_ITEM', cartId });
  };

  const updateQuantity = async (cartId, quantity) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      if (apiUrl) {
        await cartApi.updateQuantity({ item_id: cartId, quantity });
        const data = await cartApi.getCart();
        const rawItems = Array.isArray(data.items) ? data.items : (data.results || data || []);
        try {
          const metaJson = localStorage.getItem('dava_donation_meta');
          const meta = metaJson ? JSON.parse(metaJson) : {};
          const normalize = (it) => {
            const cartIdFromServer = it.cart_item_id || it.cartItemId || it.id || it.cart_id || (it.cart && it.cart.id) || null;
            const title = it.name || it.title || it.donation_title || it.name || '';
            const category = it.category || it.donation_category || '';
            const unit = it.unit_price || it.unit_amount || it.item_amount || (it.total_price && it.quantity ? Number(it.total_price) / Number(it.quantity || 1) : null) || null;
            const qty = it.quantity || 1;
            const amount = it.total_price != null ? it.total_price : (unit != null ? unit * qty : null);
            const mapped = {
              cartId: cartIdFromServer,
              cart_item_id: cartIdFromServer,
              id: it.donation_id || it.donation?.id || null,
              title,
              category,
              amount: unit,
              fixedPrice: unit,
              priceType: 'custom',
              quantity: qty,
              total_price: amount,
              raw: it,
            };
            if (cartIdFromServer && meta[cartIdFromServer]) {
              return { ...mapped, title: mapped.title || meta[cartIdFromServer].title, category: mapped.category || meta[cartIdFromServer].category, emoji: meta[cartIdFromServer].emoji };
            }
            const donationIdKey = mapped.id ? String(mapped.id) : null;
            if (donationIdKey && meta[donationIdKey]) {
              return { ...mapped, title: mapped.title || meta[donationIdKey].title, category: mapped.category || meta[donationIdKey].category, emoji: meta[donationIdKey].emoji };
            }
            return mapped;
          };
          const items = (rawItems || []).map(normalize);
          dispatch({ type: 'HYDRATE', items });
        } catch (e) {
          const items = Array.isArray(data.items) ? data.items : (data.results || data || []);
          dispatch({ type: 'HYDRATE', items });
        }
        return;
      }
    } catch (err) {
      console.error('updateQuantity API failed, falling back to local reducer', err);
    }
    dispatch({ type: 'UPDATE_QUANTITY', cartId, quantity });
  };

  const updateAmount = (cartId, amount) => {
    // amount adjustments are UI-only until we implement price recalculation on server
    dispatch({ type: 'UPDATE_AMOUNT', cartId, amount });
  };

  const clearCart = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      if (apiUrl) {
        await cartApi.clearCart();
        dispatch({ type: 'CLEAR_CART' });
        return;
      }
    } catch (err) {
      console.error('clearCart API failed, falling back to local reducer', err);
    }
    dispatch({ type: 'CLEAR_CART' });
  };

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
