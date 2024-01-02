/* Instruments */
import { authSlice, counterSlice, reviewSlice} from './slices'
import {categorySlice} from './slices'
import { bookSlice } from './slices/bookSlice/bookSlice'
import { cartSlice } from './slices/cartSlice/cartSlice'
import {orderSlice} from './slices/orderSlice/orderSlice'
import {order_itemSlice} from './slices/order_itemSlice/order_itemSlice'
export const reducer = {
  counter: counterSlice.reducer,
  category: categorySlice.reducer,
  book: bookSlice.reducer,
  cart: cartSlice.reducer,
  order: orderSlice.reducer,
  order_item: order_itemSlice.reducer,
  user: authSlice.reducer,
  review: reviewSlice.reducer,
  
}
