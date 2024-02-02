export default interface Book {
  _id?: number;
  title: string;
  price: number;
  category: {
    name: string;
  };
  qty: number;
}
