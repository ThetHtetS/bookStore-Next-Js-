import axios from '@/app/setting/our_axios';
import { API_URL } from '@/app/setting/API';
import Order from './order';
// const axios = require('axios');

export const fetchAllOrder = async () => {
  const result = await axios.get(`${API_URL}/orders`);
  const data = await result.data;
  return data;
};

export const addOrderApi = async (Order:Order) => {
  const result = await axios.post(`${API_URL}/orders`, Order);
  const data = await result.data;
  return data;
};

export const updateOrderApi = async (Order:Order) => {
  const result = await axios.put(`${API_URL}/orders/${Order._id}`, Order);
  const data = await result.data;
  return data;
};

export const deleteOrderApi = async (Order:Order) => {
  const result = await axios.delete(`${API_URL}/orders/${Order._id}`);
  const data = await result.data;
  return data;
};

export const getOrderByIdApi = async (Order:Order) => {
  const result = await axios.get(`${API_URL}/orders/${Order._id}`);
  const data = await result.data;
  return data;
};

export const getOrderByUserIdApi = async (id:any) => {
  const result = await axios.get(`${API_URL}/orders/user/${id}`);
  const data = await result.data;
  return data;
};

export const getOrderByDateRangeApi = async (date) => {
  console.log('api call', date);

  const result = await axios.post(`${API_URL}/orders/date`, date);
  const data = await result.data;
  return data;
};

export const getOrderByStatusApi = async (status) => {
  const result = await axios.post(`${API_URL}/orders/status`, status);
  const data = await result.data;
  return data;
};
