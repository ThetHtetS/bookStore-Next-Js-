/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import Category from './category';
import {
  addCategory,
  //deleteCategory,
  loadAllCategory,
  updateCategory,
} from './thunks';

export interface CategorySliceState {
  categories: Category[];
}

const initialState: CategorySliceState = {
  categories: [
    //
  ],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    loadAllCategory: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action: PayloadAction<Category>) => {
      state.categories = state.categories.filter(
        (item) => item._id !== action.payload._id,
      );
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      state.categories = state.categories.map((item) =>
        item._id == action.payload._id ? action.payload : item,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      //  .addCase(loadAllCategory.pending, (state, action) => {})
      .addCase(loadAllCategory.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categories = state.categories.map((item) =>
          item._id === action.payload._id ? action.payload : item,
        );
      });
    // .addCase(deleteCategory.fulfilled, (state, action) => {
    //   console.log('Extra delete todo reducer reject ', action.payload);
    // })
    // .addCase(deleteCategory.rejected, (state, action) => {
    //   console.log('Extra delete todo reducer reject ', action.payload);
    // });
  },
});
