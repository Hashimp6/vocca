import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  const cartFromLocalStorage = localStorage.getItem("cart");
  return cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : [];
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromLocalStorage() || [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
      state.totalAmount += action.payload.price;
      saveCartToLocalStorage(state.items);
    },
    removeFromCart: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload._id);
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      state.totalQuantity -= item.quantity;
      state.totalAmount -= item.price * item.quantity;
      saveCartToLocalStorage(state.items);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload.id);
      if (item) {
        const quantityDiff = action.payload.quantity - item.quantity;
        item.quantity = action.payload.quantity;
        state.totalQuantity += quantityDiff;
        state.totalAmount += action.payload.price * quantityDiff;
        saveCartToLocalStorage(state.items);
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
