//import axios from 'axios';
import axios from '@/app/setting/our_axios';
import { API_URL } from '@/app/setting/API';

export const login = async (user: any) => {
  const result = await axios.post(`${API_URL}/users/login`, user);
  const userResponse = await result;
  return userResponse;
};

export const register = async (user: any) => {
  const result = await axios.post(`${API_URL}/users`, user);
  const userResponse = await result;
  return userResponse;
};

// export const forgetPassword = async (email: any) => {
//   const result = await axios.post(
//     `${API_URL}/users/resetPassword/bcefb385ff93a355b500df602448a8a66c556649c57306323d741cfca5317fa5`,
//     { password: 'thet123456', passwordConfirm: 'thet123456' },
//   );
//   return result;
// };

export const getAllUser = async () => {
  const result = await axios.get(`${API_URL}/users`);
  const userResponse = await result.data;
  return userResponse;
};

export const getUserById = async (Uid: string) => {
  const result = await axios.get(`${API_URL}/users/${Uid}`);
  const userResponse = await result;
  return userResponse;
};

export const getLengthApi = async () => {
  const result = await axios.get(`${API_URL}/users/length`);
  const userResponse = await result.data;
  return userResponse;
};

export const deleteMe = async () => {
  const result = await axios.delete(`${API_URL}/users/deleteMe`);
  return result;
};

export const updateMe = async () => {
  const result = await axios.patch(`${API_URL}/users/updateMe`, {
    role: 'admin',
    name: 'Thet Htet soe hhh soe',
    email: 'thethtetsoe114@gmail.com',
  });
  return result;
};

export const updateMyPassword = async () => {
  const result = await axios.patch(`${API_URL}/users/updateMyPassword`, {
    passwordCurrent: 'thet12345678',
    password: 'thet123456',
    passwordConfirm: 'thet123456',
  });
  return result;
};
