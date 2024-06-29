import axios from '@/app/setting/our_axios';
import { API_URL } from '@/app/setting/API';

export const NewCartApi = async (cart) => {
  const response = await axios.post(`${API_URL}/carts`, cart);
  return response;
};

export const fetchCartApi = async () => {
  const response = await axios.get(`${API_URL}/carts`);
  return response;
};

export const fetchCartByUserApi = async (id) => {
  const response = await axios.get(`${API_URL}/carts/${id}`);
  return response;
};

export const updateCartApi = async (id, cart) => {
  const response = await axios.put(`${API_URL}/carts/${id}`, cart);
  return response;
};

export const deleteCartApi = async (id) => {
  const response = await axios.delete(`${API_URL}/carts/${id}`);
  return response;
};
