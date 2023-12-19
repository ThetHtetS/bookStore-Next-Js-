import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import Order from './order';

export interface OrderSliceState {
     orders:  Order[];
}


const initialState: OrderSliceState ={
    orders: [
        {
            _id:1,
            phone: "09695080740",
            name: "Ko Thet Htet Soe  ",
            address: "123/hello"

        },
        {
            _id:2,
            phone: "09o77286307",
            name: "Smith  ",
            address: "123/hello"

        }


    ]
}


export const orderSlice = createSlice({
    name: 'order',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers:
     {
      addOrder:(state,action:PayloadAction<Order>)=>{
          state.orders.push(action.payload);
      },
      deleteOrder:(state,action:PayloadAction<Order>)=> {
        state.orders = state.orders.filter(item=> item._id != action.payload._id);
     },
     updateOrder:(state,action:PayloadAction<Order>)=> {
      state.orders = state.orders.map(item=> item._id == action.payload._id?action.payload: item);
   },
    },
    
    
  })



