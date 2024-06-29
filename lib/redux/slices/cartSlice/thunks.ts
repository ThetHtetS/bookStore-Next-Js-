import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import {
  NewCartApi,
  deleteCartApi,
  fetchCartByUserApi,
  updateCartApi,
} from './api';
import { cartSlice } from '../..';

export const NewCart = createAppAsyncThunk(
  'cart/newCart',
  async (cart, thunkApi) => {
    let response;
    try {
      response = await NewCartApi(cart);
      if (response.status === 201) {
        thunkApi.dispatch(cartSlice.actions.addCart(response.data.cart));
      }
    } catch (e) {
      console.log(e);
    }
    return response;
  },
);

export const fetchCartByUser = createAppAsyncThunk(
  'cart/fetch',
  async (id, thunkApi) => {
    let response;
    try {
      response = await fetchCartByUserApi(id);
      if (response.status === 200) {
        thunkApi.dispatch(cartSlice.actions.fetchCart(response.data.carts));
      }
    } catch (e) {
      console.log(e);
    }
    return response;
  },
);

export const updateCart = createAppAsyncThunk('cart/update', async (data) => {
  let response;
  try {
    response = await updateCartApi(data.id, data.body);
  } catch (e) {
    console.log(e);
  }
  return response;
});

export const deleteCart = createAppAsyncThunk('cart/delete', async (id) => {
  let response;
  try {
    response = await deleteCartApi(id);
  } catch (e) {
    console.log(e);
  }
  return response;
});
