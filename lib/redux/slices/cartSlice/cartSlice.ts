import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import Cart from './cart';

export interface CartSliceState {
  carts: Cart[];
}

const initialState: CartSliceState = {
  carts: [

  ],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers:
     {
       addCart: (state, action:PayloadAction<Cart>) => {
         state.carts.push(action.payload);
       },
       deleteCart: (state, action:PayloadAction<Cart>) => {
         state.carts = state.carts.filter((item) => item._id != action.payload._id);
       },
       updateCart: (state, action:PayloadAction<Cart>) => {
         state.carts = state.carts.map((item) => (item._id == action.payload._id ? action.payload : item));
       },
       deleteAllCart: (state) => {
         state.carts = [];
       },
     },

});
