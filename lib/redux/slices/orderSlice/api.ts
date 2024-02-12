import axios from '@/app/setting/our_axios';
import { API_URL } from '@/app/setting/API';
import Order from './order';
// const axios = require('axios');

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

  const data = await result.data.orders;
  return data;
};

export const addOrderApi = async (Order: Order) => {
  const result = await axios.post(`${API_URL}/orders`, Order);
  const data = result.data;
  return data;
};

export const updateOrderApi = async (Order: Order) => {
  const result = await axios.put(`${API_URL}/orders/${Order._id}`, Order);
  const data = await result.data.order;

  return data;
};

export const deleteOrderApi = async (Order: Order) => {
  const result = await axios.delete(`${API_URL}/orders/${Order._id}`);
  const data = await result.data.order;
  return data;
};

export const getOrderByIdApi = async (Order: Order) => {
  const result = await axios.get(`${API_URL}/orders/${Order._id}`);
  const data = await result.data.order;
  return data;
};

export const getOrderByUserIdApi = async (id: any) => {
  const result = await axios.get(`${API_URL}/users/${id}/orders`);
  const data = await result.data.orders;
  return data;
};

export const getOrderByDateRangeApi = async (date) => {
  const result = await axios.get(
    `${API_URL}/orders?createdAt[gte]=${date.start}&createdAt[lt]=${date.end}`,
  );
  const data = await result.data.orders;
  return data;
};

// export const getOrderByStatusApi = async (Query) => {
//   let result;
//   if (Query.status === 'All') {
//     result = await axios.get(
//       `${API_URL}/orders?page=${Query.page}&limit=${Query.limit}`,
//     );
//   } else {
//     result = await axios.get(
//       `${API_URL}/orders?status=${Query.status}&page=${Query.page}&limit=${Query.limit}`,
//     );
//   }

//   const data = await result.data.data.orders;
//   return data;
// };
