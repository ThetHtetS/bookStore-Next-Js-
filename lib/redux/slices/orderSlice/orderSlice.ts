import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import Order from './order';
import {
  addNewOrder,
  deleteOrder,
  getMonthlyOrder,
  getOrderByDateRange,
  getOrderById,
  getOrderByUserId,
  loadAllOrder,
  updateOrder,
} from './thunks';

export interface OrderSliceState {
  orders: Order[];
  monthlyOrder: [];
}

const initialState: OrderSliceState = {
  orders: [],
  monthlyOrder: [],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    loadAllOrder: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    deleteOrder: (state, action: PayloadAction<Order>) => {
      state.orders = state.orders.filter(
        (item) => item._id != action.payload._id,
      );
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      state.orders = state.orders.map((item) =>
        item._id == action.payload._id ? action.payload : item,
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadAllOrder.pending, (state, action) => {
        console.log('Extra reducer Payload ', action.payload);
      })
      .addCase(loadAllOrder.fulfilled, (state, action) => {
        console.log('Extra reducer fullfilled ', action.payload);
        state.orders = action.payload;
      })
      .addCase(addNewOrder.fulfilled, (state, action) => {
        console.log('Extra addToDo reducer fullfilled ', action.payload);
        state.orders.push(action.payload.order);
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        console.log('Extra addToDo reducer fullfilled ', action.payload);
        state.orders = action.payload;
      })
      .addCase(getOrderByUserId.fulfilled, (state, action) => {
        console.log('Extra addToDo reducer fullfilled ', action.payload);
        state.orders = action.payload;
      })
      .addCase(getOrderByDateRange.fulfilled, (state, action) => {
        console.log('Extra addToDo reducer fullfilled ', action.payload);
        state.orders = action.payload;
      })
      .addCase(getMonthlyOrder.fulfilled, (state, action) => {
        console.log('Extra reducer fullfilled ', action.payload);
        state.monthlyOrder = action.payload;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        console.log('Extra update order reducer fullfilled ', action.payload);
        state.orders = action.payload;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        console.log('Extra delete todo reducer reject ', action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        console.log('Extra delete todo reducer reject ', action.payload);
      });
  },
});
