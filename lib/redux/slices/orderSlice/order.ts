//import Order_item from '../order_itemSlice/orderItem';
import Book from '../bookSlice/book';

export default interface Order {
  _id?: number;
  phone: string;
  name: string;
  address: string;
  orderItem: Book[];
  uid: string;
  status: string;
}
