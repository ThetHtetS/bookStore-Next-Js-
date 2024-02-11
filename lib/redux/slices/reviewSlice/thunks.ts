import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
// import {fetchAllMovie} from "@/lib/redux/slices/movieSlice/movieApi";
import { reviewSlice } from '@/lib/redux';
import {
  deleteReview,
  fetchAllReviewByMovieId,
  saveReview,
  updateReview,
} from '@/lib/redux/slices/reviewSlice/api';

export const getAllReviewByBookAsync = createAppAsyncThunk(
  'review/getAllReviewByMovieAsync',
  async (movieId: string, thunkApi) => {
    const reviews = await fetchAllReviewByMovieId(movieId);
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
