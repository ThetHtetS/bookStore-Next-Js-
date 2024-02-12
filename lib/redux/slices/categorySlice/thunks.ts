import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import {
  addCategoryApi,
  deleteCategoryApi,
  getCategoriesApi,
  updateCategoryApi,
} from '@/lib/redux/slices/categorySlice/api';

import { categorySlice } from '@/lib/redux';
import Category from './category';

export const loadAllCategory = createAppAsyncThunk(
  'category/fetchAllCategory',
  async () => {
    const category = await getCategoriesApi();
    return category;
  },
);

export const addCategory = createAppAsyncThunk(
  'category/addCategory',
  async (Category: Category) => {
    const newCategory = await addCategoryApi(Category);
    return newCategory;
  },
);

export const updateCategory = createAppAsyncThunk(
  'category/updateCategory',
  async (category: Category, thunkApi) => {
    const updatedCategory = await updateCategoryApi(category);
    thunkApi.dispatch(categorySlice.actions.updateCategory(updatedCategory));
    return updatedCategory;
  },
);

export const deleteCategory = createAppAsyncThunk(
  'category/deleteCategory',
  async (Category: Category, thunkApi) => {
    const deleteCategory = await deleteCategoryApi(Category);
    thunkApi.dispatch(categorySlice.actions.deleteCategory(deleteCategory));
    // return thunkApi.rejectWithValue(deleteCategory);
    return deleteCategory;
  },
);
