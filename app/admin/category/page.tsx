'use client';

import React, { useEffect, useState } from 'react';
import CategoryList from '@/app/components/admin/CategoryList';
import Category from '@/lib/redux/slices/categorySlice/category';
import EditOrSaveCategory from '@/app/components/admin/EditOrSaveCategory';
import { useSelector, useDispatch, selectCategories } from '@/lib/redux';
import {
  addCategory,
  deleteCategory,
  loadAllCategory,
  updateCategory,
} from '@/lib/redux/slices/categorySlice/thunks';

export default function IndexPage() {
  const categories: Category[] = useSelector(selectCategories);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(loadAllCategory()).unwrap();
    //.then((data) => console.log('Response from thunk ', data));
  }, []);

  const btnEditHandler = (category: Category) => {
    setCategoryToEdit(category);
  };
  const saveOrUpdateCategory = (category: Category) => {
    if (categoryToEdit) {
      const data = { ...category, _id: categoryToEdit._id };
      dispatch(updateCategory(data));
      setCategoryToEdit(null);
    } else {
      const data = { ...category };
      dispatch(addCategory(data));
      // dispatch(categorySlice.actions.addCategory(data))
    }
  };

  const deleteHandler = (data) => {
    dispatch(deleteCategory(data));
    // dispatch(categorySlice.actions.deleteCategory(data))
  };
  return (
    <div className="pt-12 px-16 md:px-8 h-screen">
      <CategoryList
        categories={categories}
        btnEditHandler={btnEditHandler}
        open={open}
        setOpen={setOpen}
        deleteHandler={deleteHandler}
      />

      <EditOrSaveCategory
        open={open}
        setOpen={setOpen}
        setCategoryToEdit={setCategoryToEdit}
        categoryToEdit={categoryToEdit}
        saveOrUpdateCategory={saveOrUpdateCategory}
      />
    </div>
  );
}
