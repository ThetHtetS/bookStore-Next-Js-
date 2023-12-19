/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import Category from './category'
import { addCategory, deleteCategory, loadAllCategory } from './thunks'

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
  extraReducers: (builder) => {
    builder
        .addCase(loadAllCategory.pending, (state,action) => {
            console.log('Extra reducer Payload ',action.payload);

        })
        .addCase(loadAllCategory.fulfilled, (state,action) => {
            console.log('Extra reducer fullfilled ',action.payload);
            state.categories = action.payload;
        })
        .addCase(addCategory.fulfilled, (state,action) => {
            console.log('Extra addToDo reducer fullfilled ',action.payload);
            state.categories.push( action.payload);
        })
        .addCase(deleteCategory.fulfilled, (state,action) => {
          console.log('Extra delete todo reducer reject ',action.payload);

      })
        .addCase(deleteCategory.rejected, (state,action) => {
            console.log('Extra delete todo reducer reject ',action.payload);

        })
    ;

},
  
})



