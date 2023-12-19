import {createAppAsyncThunk} from "@/lib/redux/createAppAsyncThunk";
import { addCategoryApi, deleteCategoryApi, fetchAllCategory} from "@/lib/redux/slices/categorySlice/api";

import {categorySlice} from "@/lib/redux";
import Category from "./category";


export const loadAllCategory = createAppAsyncThunk(
    'category/fetchAllCategory',
    async ()=>{
        let category = await fetchAllCategory();
        return category;
    }   
); 


export const addCategory = createAppAsyncThunk(
    'category/addCategory',
    async(Category:Category)=>{
        let newCategory = await addCategoryApi(Category);
        console.log('Thunk response ',newCategory);
        return newCategory;
    }
)
export const deleteCategory = createAppAsyncThunk(
    'category/deleteCategory',
    async(Category:Category,thunkApi)=>{
        let deleteCategory = await deleteCategoryApi(Category);
        console.log('Thunk Api ',thunkApi);
        console.log('Thunk response delete Category ',deleteCategory);
        thunkApi.dispatch(categorySlice.actions.deleteCategory(deleteCategory));
        //return thunkApi.rejectWithValue(deleteCategory);
        return deleteCategory;
    }
)

