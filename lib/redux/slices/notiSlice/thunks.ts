import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import { fetchNotiApi, sendNotiApi } from './api';
import { notiSlice } from './notiSlice';

export const sendNoti = createAppAsyncThunk('noti/send', async (data) => {
  let response;
  try {
    response = await sendNotiApi(data);
  } catch (e) {
    console.log(e);
  }
  return response;
});

export const fetchNoti = createAppAsyncThunk(
  'noti/fetch',
  async (limit, thunkApi) => {
    let response;
    try {
      response = await fetchNotiApi();
      if (response.status === 200) {
        thunkApi.dispatch(notiSlice.actions.fetchNoti(response.data.result));
      }
    } catch (e) {
      console.log(e);
    }
    return response;
  },
);
