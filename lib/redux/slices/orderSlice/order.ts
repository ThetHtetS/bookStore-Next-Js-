import Order_item from "../order_itemSlice/orderItem";

export default interface Order
{
    _id?:number,
     phone: string,
     name: string,
     address: string,
     orderItem: Order_item[] ,
     uid: string,
     status: string, 
}