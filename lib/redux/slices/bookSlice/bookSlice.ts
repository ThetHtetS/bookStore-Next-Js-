import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import Book from './book';
import {
  addBook,
  deleteBook,
  getBook,
  getBookByTitle,
  loadAllBook,
  updateBook,
} from './thunks';

export interface BookSliceState {
  books: Book[];
}

const initialState: BookSliceState = {
  books: [
    // {
    //     _id: 1,
    //     title: "Political Orders",
    //     price: 9800,
    //     category: 1,
    //     qty: 50
    // },
  ],
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    loadAllBook: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
    },
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
    deleteBook: (state, action: PayloadAction<Book>) => {
      state.books = state.books.filter(
        (item) => item._id != action.payload._id,
      );
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      state.books = state.books.map((item) =>
        item._id == action.payload._id ? action.payload : item,
      );
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(loadAllBook.fulfilled, (state, action) => {
        state.books = action.payload;
      })
      .addCase(getBookByTitle.fulfilled, (state, action) => {
        state.books = action.payload;
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.books = action.payload;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.books = state.books.map((item) =>
          item._id === action.payload._id ? action.payload : item,
        );
      });
    // .addCase(deleteBook.fulfilled, (state, action) => {
    //   console.log('Extra delete todo reducer reject ', action.payload);
    // })
    // .addCase(deleteBook.rejected, (state, action) => {
    //   console.log('Extra delete todo reducer reject ', action.payload);
    // });
  },
});
