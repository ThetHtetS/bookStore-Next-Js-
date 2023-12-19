'use client'
import CategoryList from '@/app/components/admin/CategoryList';
import Category from '@/lib/redux/slices/categorySlice/category';
import React, { useEffect, useState } from 'react';
import EditOrSaveCategory from '@/app/components/admin/EditOrSaveCategory';
import {
  categorySlice,
  useSelector,
  useDispatch,
  selectCategories,
}
from '@/lib/redux'
import { addCategory, deleteCategory, loadAllCategory } from '@/lib/redux/slices/categorySlice/thunks';



export default function IndexPage() {
 
  const categories :Category[]= useSelector(selectCategories);
  const [categoryToEdit,setCategoryToEdit] = useState(null);   
  let dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  

  useEffect(()=>{
    console.log('Call API ');
    dispatch(loadAllCategory())
        .unwrap()
        .then(data=>console.log('Response from thunk ',data));

},[])

  let btnEditHandler =(category:Category)=>{
    setCategoryToEdit(category);
  }
  let saveOrUpdateCategory =(category: Category)=>{
    if(categoryToEdit){
     let data ={...category, _id: categoryToEdit._id}
     dispatch(categorySlice.actions.updateCategory(data))
     setCategoryToEdit(null)
    }
    else{
     let data={...category}
     dispatch(addCategory(data))
    //  dispatch(categorySlice.actions.addCategory(data))
    }  
 }

  let deleteHandler  =(data)=>{
     dispatch(deleteCategory(data))  
    //dispatch(categorySlice.actions.deleteCategory(data))
  }
  return (
    <div className="pt-12 px-16 md:px-8 h-screen">
    <CategoryList categories={categories} btnEditHandler={btnEditHandler}
    open={open} setOpen={setOpen} deleteHandler ={deleteHandler}/>
    
    <EditOrSaveCategory open={open} setOpen={setOpen} 
    setCategoryToEdit={setCategoryToEdit} 
    categoryToEdit={categoryToEdit}
    saveOrUpdateCategory={saveOrUpdateCategory}/>
  </div>
   
  )
}
