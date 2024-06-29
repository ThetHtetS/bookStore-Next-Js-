export default interface Book {
  _id?: number;
  title: string;
  author: string;
  photo: string;
  price: number;
  discountPrice: number;
  stock: number;
  category: {
    name: string;
  };
  qty: number;
}
