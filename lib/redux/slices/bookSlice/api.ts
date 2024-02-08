import axios from '@/app/setting/our_axios';
import { API_URL } from '@/app/setting/API';
import Book from './book';
// const axios = require('axios');

export const fetchAllBook = async (pagination) => {
  const result = await axios.get(
    `${API_URL}/books?page=${pagination.page}&limit=${pagination.limit}`,
  );

  const books = result.data.data.books;
  return books;
};

export const fetchBookByTitle = async (title) => {
  const result = await axios.get(`${API_URL}/books/title/${title}`);
  const books = await result.data.data.books;
  return books;
};

export const addBookApi = async (Book: Book) => {
  const result = await axios.post(`${API_URL}/books`, Book);
  const BookJson = await result.data;
  return BookJson;
};

export const updateBookApi = async (Book: Book) => {
  const result = await axios.put(`${API_URL}/books/${Book._id}`, Book);
  const BookJson = await result.data;
  return BookJson;
};

export const deleteBookApi = async (Book: Book) => {
  const result = await axios.delete(`${API_URL}/books/${Book._id}`);

  const BookJson = await result.data;
  return BookJson;
};

export const getBookByIdApi = async (book: object) => {
  const result = await axios.get(`${API_URL}/books/${book._id}`);
  const BookJson = await result.data;
  return BookJson;
};
