import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';

import { authSlice } from '@/lib/redux';
import {
  getAllUser,
  getLengthApi,
  login,
  register,
  deleteMe,
  forgetPasswordApi,
  resetPasswordApi,
} from '@/lib/redux/slices/authSlice/api';
//import exp from 'constants';

export const loginAsync = createAppAsyncThunk(
  'auth/login',
  async (user: any, thunkApi) => {
    let userResponse;
    try {
      userResponse = await login(user);

      if (userResponse.status === 200) {
        thunkApi.dispatch(authSlice.actions.login(userResponse.data));
        window.localStorage.setItem('token', userResponse.data.token);
        localStorage.setItem('Uid', userResponse.data._id);
        localStorage.setItem('username', userResponse.data.name);
      }
    } catch (e) {
      //console.log('Error case ', e.response);
      return thunkApi.rejectWithValue(e.response.data);
    }

    return userResponse.data;
  },
);

export const deleteMeAsync = createAppAsyncThunk('auth/delete', async () => {
  try {
    const response = await deleteMe();
    if (response.status === 200) {
      localStorage.removeItem('token');
      localStorage.removeItem('Uid');
      localStorage.removeItem('username');
    }
    return response.data;
  } catch (e) {
    console.log(e);
  }
});

export const RegisterAsync = createAppAsyncThunk(
  'auth/register',
  async (user: any, thunkApi) => {
    let userResponse;
    try {
      userResponse = await register(user);
      if (userResponse.status === 200) {
        // thunkApi.dispatch(authSlice.actions.login(userResponse.data));
        localStorage.setItem('token', userResponse.data.token);
        localStorage.setItem('Uid', userResponse.data._id);
        localStorage.setItem('username', userResponse.data.name);
      }
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }

    return userResponse.data;
  },
);

export const forgetPasswordAsync = createAppAsyncThunk(
  'auth/forgetPassword',
  async (email: any, thunkApi) => {
    let userResponse;
    try {
      userResponse = await forgetPasswordApi(email);
    } catch (e) {
      //console.log('Error case ', e.response);
      return thunkApi.rejectWithValue(e.response.data);
    }
    return userResponse.data;
  },
);

export const resetPasswordAsync = createAppAsyncThunk(
  'auth/resetPassword',
  async (data: any, thunkApi) => {
    let userResponse;
    try {
      userResponse = await resetPasswordApi(data);
      if (userResponse.status === 200) {
        thunkApi.dispatch(authSlice.actions.login(userResponse.data));
        localStorage.setItem('token', userResponse.data.token);
        localStorage.setItem('Uid', userResponse.data._id);
        localStorage.setItem('username', userResponse.data.name);
      } else {
        //  console.log("catch error",userResponse.data);

        return thunkApi.rejectWithValue(userResponse.data);
      }
    } catch (e) {
      //console.log('Error case ', e.response);
      return thunkApi.rejectWithValue(e.response.data);
    }
    return userResponse.data;
  },
);

export const loadAllUser = createAppAsyncThunk('auth/loadAllUser', async () => {
  const users = await getAllUser();
  return users;
});

export const getLength = createAppAsyncThunk('auth/getLength', async () => {
  const length = await getLengthApi();
  return length;
});
