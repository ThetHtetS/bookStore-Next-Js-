export default interface Book {
  _id?: number;
  title: string;
  author: string;
  price: number;
  category: {
    name: string;
  };
  qty: number;
}
