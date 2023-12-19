/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import Category from './category'

/* Instruments */
//import { incrementAsync } from './thunks'
export interface CategorySliceState {
    categories: Category[]
}


const initialState: CategorySliceState = {
 categories: [
    {
      _id: 1,
      name: "Business"
    },
    {
      _id:2,
      name: "Health"
    },
    {
      _id: 3,
      name: "Comic"
    },
   {
    _id: 4,
    name: "History"
   },
   {
    _id: 5,
    name: "Kids"
   }
 ]
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    loadAllCategory: (state,action:PayloadAction<Category[]>) => {
        state.categories = action.payload;
    },
    addCategory:(state,action:PayloadAction<Category>)=>{
        state.categories.push(action.payload);
    },
    deleteCategory:(state,action:PayloadAction<Category>)=> {
      state.categories = state.categories.filter(item=> item._id != action.payload._id);
   },
   updateCategory:(state,action:PayloadAction<Category>)=> {
    state.categories = state.categories.map(item=> item._id == action.payload._id?action.payload: item);
 },
   
  
   
  },
  
  
})



