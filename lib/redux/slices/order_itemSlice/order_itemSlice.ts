// import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// import Order_item from './orderItem';

// export interface orderItemSliceState {
//   order_items: Order_item[];
// }

// const initialState: orderItemSliceState = {
//   order_items: [
//     {
//       _id: 2,
//       book: 2,
//       order: 2,
//       qty: 3,
//     },
//     {
//       _id: 1,
//       book: 1,
//       order: 1,
//       qty: 3,
//     },
//   ],
// };

// export const order_itemSlice = createSlice({
//   name: 'order_item',
//   initialState,
//   // The `reducers` field lets us define reducers and generate associated actions
//   reducers: {
//     addOrder_item: (state, action: PayloadAction<Order_item>) => {
//       state.order_items.push(action.payload);
//     },
//     deleteOrder_item: (state, action: PayloadAction<Order_item>) => {
//       state.order_items = state.order_items.filter(
//         (item) => item._id != action.payload._id,
//       );
//     },
//     updateOrder_item: (state, action: PayloadAction<Order_item>) => {
//       state.order_items = state.order_items.map((item) =>
//         item._id == action.payload._id ? action.payload : item,
//       );
//     },
//   },
// });
