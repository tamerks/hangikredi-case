import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const yemekCartSlice = createSlice({
  name: 'yemekCart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, name, price } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id,
          name,
          price,
          quantity: 1,
        });
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);
      
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.id !== itemId);
        }
      }
    },
    removeItemCompletely: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, removeItemCompletely, clearCart } = yemekCartSlice.actions;

export const selectYemekCartItems = (state) => state.yemekCart.items;
export const selectYemekCartTotal = (state) => {
  return state.yemekCart.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};
export const selectYemekCartItemCount = (state) => {
  return state.yemekCart.items.reduce((count, item) => {
    return count + item.quantity;
  }, 0);
};
export const selectYemekCartUniqueItemCount = (state) => {
  return state.yemekCart.items.length;
};

export default yemekCartSlice.reducer;
