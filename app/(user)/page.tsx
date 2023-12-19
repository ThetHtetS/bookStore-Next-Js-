"use client"
import { cartSlice, selectBooks, selectCategories, useDispatch, useSelector } from '@/lib/redux'
import Book from '@/lib/redux/slices/bookSlice/book'
import React, { useState } from 'react'
import Category from '@/lib/redux/slices/categorySlice/category'
import BooksList from '../components/User/BookList'


export default function Indexpage() {
  let [cart,setCart]= useState([])
  
  let dispatch = useDispatch();
  let books: Book[]= useSelector(selectBooks)
  let categories: Category[]=useSelector(selectCategories)
  
  let addToCart =(items)=>{
      dispatch(cartSlice.actions.addCart(items))
  }
   
  return (
    <div className='mx-4'> 
      {/* <div className={`h-72 bg-[url('https://images.pexels.com/photos/12064/pexels-photo-12064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]`}>
        
    
    
 
      </div> */}
      <BooksList books={books} categories={categories} addToCart={addToCart}/>
 


    </div>
  )
}
