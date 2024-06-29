import axios from '@/app/setting/our_axios';
import { API_URL } from '@/app/setting/API';
import Order from './order';

export const fetchAllOrder = async (pagination) => {
  let result;
  if (pagination.status === 'All') {
    result = await axios.get(
      `${API_URL}/orders?page=${pagination.page}&limit=${pagination.limit}`,
    );
  } else {
    result = await axios.get(
      `${API_URL}/orders?status=${pagination.status}&page=${pagination.page}&limit=${pagination.limit}`,
    );
  }
  return result.data.orders;
};

export const addOrderApi = async (order: Order) => {
  const result = await axios.post(`${API_URL}/orders`, order);
  return result.data;
};

export const updateOrderApi = async (order: Order) => {
  const result = await axios.put(`${API_URL}/orders/${order._id}`, order);
  return result.data.order;
};

export const deleteOrderApi = async (order: Order) => {
  const result = await axios.delete(`${API_URL}/orders/${order._id}`);
  const data = await result.data.order;
  return data;
};

export const getOrderByIdApi = async (order: Order) => {
  const result = await axios.get(`${API_URL}/orders/${order._id}`);
  const data = await result.data.order;
  return data;
};

export const getOrderByUserIdApi = async (id: any) => {
  const result = await axios.get(`${API_URL}/users/${id}/orders`);
  return result.data.orders;
};

export const getOrderByDateRangeApi = async (date: Object) => {
  const result = await axios.get(
    `${API_URL}/orders?createdAt[gte]=${date.start}&createdAt[lt]=${date.end}`,
  );
  return result.data.orders;
};

export const getMonthlyOrderApi = async (year) => {
  const result = await axios.get(`${API_URL}/orders/monthly/${year}`);
  return result;
};

export const getLastSevenDayApi = async () => {
  const result = await axios.get(`${API_URL}/orders/daily-sale`);
  return result;
};
