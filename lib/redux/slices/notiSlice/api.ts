import axios from '@/app/setting/our_axios';
import { API_URL } from '@/app/setting/API';

export const sendNotiApi = async (data) => {
  const response = await axios.post(`${API_URL}/notifications`, data);
  return response;
};

export const fetchNotiApi = async () => {
  const response = await axios.get(`${API_URL}/notifications`);
  return response;
};
