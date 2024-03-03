import axios from '@/app/setting/our_axios';
import { API_URL } from '@/app/setting/API';
import Book from './book';

export const getBooksApi = async (pagination) => {
  const result = await axios.get(
    `${API_URL}/books?page=${pagination.page}&limit=${pagination.limit}`,
  );
  return result;
};

export const fetchBookByTitle = async (title) => {
  const result = await axios.get(`${API_URL}/books/title/${title}`);
  return result.data.books;
};

export const addBookApi = async (Book: Book) => {
  const result = await axios.post(`${API_URL}/books`, Book, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return result.data.book;
};

export const updateBookApi = async (Book: Book) => {
  const result = await axios.put(`${API_URL}/books/${Book._id}`, Book);

  return result.data.book;
};

export const deleteBookApi = async (Book: Book) => {
  const result = await axios.delete(`${API_URL}/books/${Book._id}`);

  return result.data.book;
};

export const getBookApi = async (book: object) => {
  const result = await axios.get(`${API_URL}/books/${book._id}`);
  return result.data.book;
};
