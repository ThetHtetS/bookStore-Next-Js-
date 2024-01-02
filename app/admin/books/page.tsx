"use client"
import NewOrUpdateBooks from '@/app/components/admin/NewOrUpdateBooks';
import BooksList from '@/app/components/admin/bookList';
import { selectBooks, useSelector,getCategoryById, selectCategories, useDispatch, bookSlice} from '@/lib/redux'
import Book from '@/lib/redux/slices/bookSlice/book';
import { addBook, deleteBook, loadAllBook, updateBook } from '@/lib/redux/slices/bookSlice/thunks';
import Category from '@/lib/redux/slices/categorySlice/category';
import { loadAllCategory } from '@/lib/redux/slices/categorySlice/thunks';
import React, { useEffect, useState } from 'react';

export default function IndexPage() {
  let dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const books: Book[] = useSelector(selectBooks)
  const [bookToEdit,setBookToEdit]= useState(null);
  const categories: Category[] = useSelector(selectCategories)
console.log(books);

  useEffect(()=>{
   
    dispatch(loadAllBook())
        .unwrap()
        .then(data=>console.log('Response from thunk ',data));
    dispatch(loadAllCategory())

},[])
  
  let btnEditHandler =(book:Book)=>{
    setBookToEdit(book);
  }
  let saveOrUpdateBook =(book: Book)=>{
    if(bookToEdit){
     //let category= book.category;
     let data ={...book , _id: bookToEdit._id}
     dispatch(updateBook(data))
     setBookToEdit(null)
    }
    else{
    //  let data={...book}
      dispatch(addBook(book))
    }  
 }

  let deleteHandler  =(data)=>{
    dispatch(deleteBook(data))
  }
      
 
  return (
    <div className='pt-12 px-16 md:px-8 h-screen '>
     <BooksList btnEditHandler={btnEditHandler} deleteHandler={deleteHandler} open={open} setOpen={setOpen} books={books} />
     <NewOrUpdateBooks  open={open} setOpen={setOpen} categories={categories} bookToEdit={bookToEdit} setBookToEdit= {setBookToEdit} 
     saveOrUpdateBook={saveOrUpdateBook}/>
    </div>
  )
}
