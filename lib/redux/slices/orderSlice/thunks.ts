import {createAppAsyncThunk} from "@/lib/redux/createAppAsyncThunk";
import { addOrderApi, deleteOrderApi, fetchAllOrder, getOrderByDateRangeApi, getOrderByIdApi, getOrderByStatusApi, getOrderByUserIdApi, updateOrderApi} from "@/lib/redux/slices/orderSlice/api";
import {orderSlice} from "@/lib/redux";
import Order from "./order";


export const loadAllOrder= createAppAsyncThunk(
    'order/fetchAllOrder',
    async ()=>{
        let data = await fetchAllOrder();
        return data;
    }   
); 


export const addNewOrder= createAppAsyncThunk(
    'order/addOrder',
    async(Order:Order)=>{
        let newOrder= await addOrderApi(Order);
        return newOrder;
    }
)

export const updateOrder=  createAppAsyncThunk(
    'order/updateOrder',
    async(Order:Order,thunkApi)=>{
        let newOrder= await updateOrderApi(Order);
     //  thunkApi.dispatch(orderSlice.actions.updateOrder(newOrder));
        return newOrder;
    }
)

export const deleteOrder= createAppAsyncThunk(
    'order/deleteOrder',
    async(Order:Order,thunkApi)=>{
        console.log(Order);
        
        let deleteOrder= await deleteOrderApi(Order);
        console.log('Thunk Api ',thunkApi);
        console.log('Thunk response delete Order',deleteOrder);
        thunkApi.dispatch(orderSlice.actions.deleteOrder(deleteOrder));
        //return thunkApi.rejectWithValue(deleteOrder);
        return deleteOrder;
    }
)

export const getOrderById= createAppAsyncThunk(
    'order/getOrderById',
    async(Order:Order,thunkApi)=>{
        console.log(Order);   
        let order= await getOrderByIdApi(Order);
        // console.log('Thunk Api ',thunkApi);
        // console.log('Thunk response delete Order',order);
       // thunkApi.dispatch(orderSlice.actions.addOrderById(order));
        //return thunkApi.rejectWithValue(deleteOrder);
        return order;
    }
)

export const getOrderByUserId= createAppAsyncThunk(
    'order/getOrderByUserId',
    async(user)=>{
       
        let order= await getOrderByUserIdApi(user);
        return order;
    }
)

export const getOrderByDateRange= createAppAsyncThunk(
    'order/getOrderByDateRange',
    async(date)=>{
       
        let order= await getOrderByDateRangeApi(date);
        return order;
    }
)

export const getOrderByStatus= createAppAsyncThunk(
    'order/getOrderByStatus',
    async(status)=>{
       
        let order= await getOrderByStatusApi(status);
        return order;
    }
)



