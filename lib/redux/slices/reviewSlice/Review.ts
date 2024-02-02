import Book from '../bookSlice/book';

export default interface Review {
  _id?: string;
  book: Book;
  uid: {
    _id: string;
    username: string;
  };
  rating?: string;
  review?: string;
}
