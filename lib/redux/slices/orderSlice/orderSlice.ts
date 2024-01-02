import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import Order from './order';
import { addNewOrder, deleteOrder, getOrderByDateRange, getOrderById, getOrderByStatus, getOrderByUserId, loadAllOrder, updateOrder } from './thunks';


export interface OrderSliceState {
     orders:  Order[];
}


const initialState: OrderSliceState ={
   orders: [
        // {
        //     _id:1,
        //     phone: "09695080740",
        //     name: "Ko Thet Htet Soe  ",
        //     address: "123/hello",
        //     orderItem:  [{book: 2, qty: 10},{book:1,qty:3}]
        // },
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

    extraReducers: (builder) => {
        builder
            .addCase(loadAllOrder.pending, (state,action) => {
                console.log('Extra reducer Payload ',action.payload);
    
            })
            .addCase(loadAllOrder.fulfilled, (state,action) => {
                console.log('Extra reducer fullfilled ',action.payload);
                state.orders = action.payload;
            })
            .addCase(addNewOrder.fulfilled, (state,action) => {
                console.log('Extra addToDo reducer fullfilled ',action.payload);
                state.orders.push( action.payload);
            })
            .addCase(getOrderById.fulfilled, (state,action) => {
                console.log('Extra addToDo reducer fullfilled ',action.payload);
                state.orders= action.payload;
            })
            .addCase(getOrderByUserId.fulfilled, (state,action) => {
                console.log('Extra addToDo reducer fullfilled ',action.payload);
                state.orders= action.payload;
            })
            .addCase(getOrderByDateRange.fulfilled, (state,action) => {
                console.log('Extra addToDo reducer fullfilled ',action.payload);
                state.orders= action.payload;
            })
            .addCase(getOrderByStatus.fulfilled, (state,action) => {
                console.log('Extra reducer fullfilled ',action.payload);
                state.orders = action.payload;
            })
            .addCase(updateOrder.fulfilled, (state,action) => {
                console.log('Extra update order reducer fullfilled ',action.payload);
                state.orders= action.payload;
            })
            .addCase(deleteOrder.fulfilled, (state,action) => {
              console.log('Extra delete todo reducer reject ',action.payload);
    
          })
            .addCase(deleteOrder.rejected, (state,action) => {
                console.log('Extra delete todo reducer reject ',action.payload);
    
            })
        ;
    
    },
  })



