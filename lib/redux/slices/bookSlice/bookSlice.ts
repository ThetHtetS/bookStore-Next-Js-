import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import Book from './book'

export interface BookSliceState {
    books:  Book[];
}



const initialState: BookSliceState ={
    books: [
        {
            _id: 1,
            title: "Political Orders",
            price: 9800,
            category: 1,
            qty: 50
        },
        {
            _id: 2,
            title: "Freedom from Fear",
            price: 9800,
            category: 2,
            qty: 10
        },
        {
            _id: 3,
            title: "သမိုင်း",
            price: 9800,
            category: 2,
            qty: 5
        }

    ]
}


export const bookSlice = createSlice({
    name: 'book',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      loadAllBook: (state,action:PayloadAction<Book[]>) => {
          state.books = action.payload;
      },
      addBook:(state,action:PayloadAction<Book>)=>{
          state.books.push(action.payload);
      },
      deleteBook:(state,action:PayloadAction<Book>)=> {
        state.books = state.books.filter(item=> item._id != action.payload._id);
     },
     updateBook:(state,action:PayloadAction<Book>)=> {
      state.books = state.books.map(item=> item._id == action.payload._id?action.payload: item);
   },
    },
    
    
  })



