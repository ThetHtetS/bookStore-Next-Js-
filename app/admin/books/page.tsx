"use client"
import NewOrUpdateBooks from '@/app/components/admin/NewOrUpdateBooks';
import BooksList from '@/app/components/admin/bookList';
import { selectBooks, useSelector,getCategoryById, selectCategories, useDispatch, bookSlice} from '@/lib/redux'
import Book from '@/lib/redux/slices/bookSlice/book';
import Category from '@/lib/redux/slices/categorySlice/category';
import React, { useState } from 'react';

export default function IndexPage() {
  let dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const books: Book[] = useSelector(selectBooks)
  const [bookToEdit,setBookToEdit]= useState(null);
  const categories: Category[] = useSelector(selectCategories)

  console.log("book", books);
  
  let btnEditHandler =(book:Book)=>{
    setBookToEdit(book);
  }
  let saveOrUpdateBook =(book: Book)=>{
    if(bookToEdit){
     //let category= book.category;
     let data ={...book , _id: bookToEdit._id}
     dispatch(bookSlice.actions.updateBook(data))
     setBookToEdit(null)
    }
    else{
     let data={...book, _id: 7}
      dispatch(bookSlice.actions.addBook(data))
    }  
 }

  let deleteHandler  =(data)=>{
    dispatch(bookSlice.actions.deleteBook(data))
  }
      
 
  return (
    <div className='pt-12 px-16 md:px-8 h-screen '>
     <BooksList btnEditHandler={btnEditHandler} deleteHandler={deleteHandler} open={open} setOpen={setOpen} books={books} categories={categories}/>
     <NewOrUpdateBooks  open={open} setOpen={setOpen} categories={categories} bookToEdit={bookToEdit} setBookToEdit= {setBookToEdit} 
     saveOrUpdateBook={saveOrUpdateBook}/>
    </div>
  )
}
