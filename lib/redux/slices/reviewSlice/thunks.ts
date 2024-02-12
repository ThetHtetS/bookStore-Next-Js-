import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';

import { reviewSlice } from '@/lib/redux';
import {
  deleteReview,
  getReviews,
  saveReview,
  updateReview,
} from '@/lib/redux/slices/reviewSlice/api';

export const getAllReviewByBookAsync = createAppAsyncThunk(
  'review/getAllReviewByMovieAsync',
  async (bookId: string, thunkApi) => {
    const reviews = await getReviews(bookId);
    thunkApi.dispatch(reviewSlice.actions.loadAllReviewByMovie(reviews));
    return reviews;
  },
);
export const saveReviewAsync = createAppAsyncThunk(
  'review/saveReviewAsync',
  async (review: any, thunkApi) => {
    const reviewResponse = await saveReview(review);

    thunkApi.dispatch(reviewSlice.actions.addReview(reviewResponse));

    return reviewResponse;
  },
);
export const updateReviewAsync = createAppAsyncThunk(
  'review/updateReviewAsync',
  async (review: any, thunkApi) => {
    const reviewResponse = await updateReview(review);

    if (reviewResponse.status == 200) {
      thunkApi.dispatch(reviewSlice.actions.updateReview(reviewResponse.data));
    }

    return reviewResponse.data;
  },
);
export const deleteReviewAsync = createAppAsyncThunk(
  'review/deleteReviewAsync',
  async (review: any, thunkApi) => {
    const reviewResponse = await deleteReview(review);

    thunkApi.dispatch(reviewSlice.actions.deleteReview(reviewResponse));

    return reviewResponse;
  },
);
