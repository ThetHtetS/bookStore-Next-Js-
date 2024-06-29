import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import {
  addOrderApi,
  deleteOrderApi,
  fetchAllOrder,
  getLastSevenDayApi,
  getMonthlyOrderApi,
  getOrderByDateRangeApi,
  getOrderByIdApi,
  getOrderByUserIdApi,
  updateOrderApi,
} from '@/lib/redux/slices/orderSlice/api';
import { orderSlice } from '@/lib/redux';
import Order from './order';

export const loadAllOrder = createAppAsyncThunk(
  'order/loadAllOrder',
  async (pagination) => {
    const data = await fetchAllOrder(pagination);
    return data;
  },
);

export const addNewOrder = createAppAsyncThunk(
  'order/addNewOrder',
  async (order: Order) => {
    const newOrder = await addOrderApi(order);
    return newOrder;
  },
);

export const updateOrder = createAppAsyncThunk(
  'order/updateOrder',
  async (order: Order, thunkApi) => {
    const newOrder = await updateOrderApi(order);
    //  thunkApi.dispatch(orderSlice.actions.updateOrder(newOrder));
    return newOrder;
  },
);

export const deleteOrder = createAppAsyncThunk(
  'order/deleteOrder',
  async (order: Order, thunkApi) => {
    const deletedOrder = await deleteOrderApi(order);
    thunkApi.dispatch(orderSlice.actions.deleteOrder(deletedOrder));
    // return thunkApi.rejectWithValue(deleteOrder);
    return deletedOrder;
  },
);

export const getOrderById = createAppAsyncThunk(
  'order/getOrderById',
  async (order: Order, thunkApi) => {
    const orders = await getOrderByIdApi(order);
    // thunkApi.dispatch(orderSlice.actions.addOrderById(order));
    // return thunkApi.rejectWithValue(deleteOrder);
    return orders;
  },
);

export const getOrderByUserId = createAppAsyncThunk(
  'order/getOrderByUserId',
  async (user) => {
    const order = await getOrderByUserIdApi(user);
    return order;
  },
);

export const getOrderByDateRange = createAppAsyncThunk(
  'order/getOrderByDateRange',
  async (date) => {
    const order = await getOrderByDateRangeApi(date);
    return order;
  },
);

export const getMonthlyOrder = createAppAsyncThunk(
  'order/getOrderMonthly',
  async (year, thunkApi) => {
    const result = await getMonthlyOrderApi(year);
    return result.data.monthlyOrder;
  },
);

export const getDailySales = createAppAsyncThunk(
  'order/dailySales',
  async (year, thunkApi) => {
    const result = await getLastSevenDayApi();
    return result.data.monthlyOrder;
  },
);
