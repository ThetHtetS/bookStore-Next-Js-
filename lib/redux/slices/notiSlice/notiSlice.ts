import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Noti from './notification';

export interface NotiShape {
  noti: Noti[];
}
const initialState: NotiShape = {
  noti: [],
};
export const notiSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    fetchNoti: (state, action: PayloadAction<Noti[]>) => {
      state.noti = action.payload;
    },
    addNoti: (state, action: PayloadAction<Noti>) => {
      state.noti.push(action.payload);
    },
  },
});
