import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import {
  addBookApi,
  getBooksApi,
  getBookApi,
  updateBookApi,
  deleteBookApi,
  fetchBookByTitle,
} from '@/lib/redux/slices/bookSlice/api';
import { bookSlice } from '@/lib/redux';
import Book from './book';

export const loadAllBook = createAppAsyncThunk(
  'book/fetchAllBook',
  async (pagination) => {
    const Book = await getBooksApi(pagination);
    return Book;
  },
);

export const getBook = createAppAsyncThunk(
  'book/getBookById',
  async (Book: object) => {
    const book = await getBookApi(Book);
    return book;
  },
);

export const getBookByTitle = createAppAsyncThunk(
  'book/getBookByTitle',
  async (title: string) => {
    const book = await fetchBookByTitle(title);
    return book;
  },
);

export const addBook = createAppAsyncThunk(
  'book/addBook',
  async (Book: Book, thunkApi) => {
    let response;
    try {
      response = await addBookApi(Book);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
    return response;
  },
);

export const updateBook = createAppAsyncThunk(
  'book/updateBook',

  async (Book: Book, thunkApi) => {
    let response;
    try {
      response = await await updateBookApi(Book);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
    thunkApi.dispatch(bookSlice.actions.updateBook(response));
    return response;
  },
);

export const deleteBook = createAppAsyncThunk(
  'book/deleteBook',
  async (Book: Book, thunkApi) => {
    let response;
    try {
      response = await deleteBookApi(Book);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
    thunkApi.dispatch(bookSlice.actions.deleteBook(response));

    return response;
  },
);
