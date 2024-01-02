import {createAppAsyncThunk} from "@/lib/redux/createAppAsyncThunk";
import { addBookApi, deleteBookApi, fetchAllBook, fetchBookByTitle, getBookByIdApi, updateBookApi} from "@/lib/redux/slices/bookSlice/api";

import {bookSlice} from "@/lib/redux";
import Book from "./book";


export const loadAllBook = createAppAsyncThunk(
    'book/fetchAllBook',
    async ()=>{
        let Book = await fetchAllBook();
        return Book;
    }   
); 

export const getBookById = createAppAsyncThunk(
    'book/getBookById',
    async (Book:Book)=>{
        let book = await getBookByIdApi(Book);
        return book;
    }   
); 

export const getBookByTitle = createAppAsyncThunk(
    'book/getBookByTitle',
    async (title:string)=>{
        let book = await fetchBookByTitle(title);
        return book;
    }   
); 



export const addBook = createAppAsyncThunk(
    'book/addBook',
    async(Book:Book)=>{
        let newBook = await addBookApi(Book);
        return newBook;
    }
)

export const updateBook = createAppAsyncThunk(
    'book/updateBook',
    
    
    async(Book:Book,thunkApi)=>{
        console.log("update Book thunks");
        let updatedBook = await updateBookApi(Book);
        thunkApi.dispatch(bookSlice.actions.updateBook(updatedBook));
        return updatedBook;
    }
)

export const deleteBook = createAppAsyncThunk(
    'book/deleteBook',
    async(Book:Book,thunkApi)=>{
        console.log(Book);
        
        let deleteBook = await deleteBookApi(Book);
        console.log('Thunk Api ',thunkApi);
        console.log('Thunk response delete Book ',deleteBook);
        thunkApi.dispatch(bookSlice.actions.deleteBook(deleteBook));
        //return thunkApi.rejectWithValue(deleteBook);
        return deleteBook;
    }
)
