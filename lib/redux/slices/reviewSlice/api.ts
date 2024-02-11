import { API_URL } from '@/app/setting/API';
import axios from '@/app/setting/our_axios';

export const fetchAllReviewByMovieId = async (movieId: string) => {
  const result = await axios.get(`${API_URL}/reviews/book/${movieId._id}`);
  console.log('Result ////////', result.data.data.review);
  const reviews = await result.data.data.review;
  return reviews;
};

export const saveReview = async (review: any) => {
  console.log(review, '///////');
  const result = await axios.post(`${API_URL}/reviews`, review);

  const reviews = await result.data.data.review;
  return reviews;
};
export const updateReview = async (review: any) => {
  const result = await axios.put(`${API_URL}/reviews/${review._id}`, review);
  console.log('Result ', result);
  const reviews = await result.data.data.review;
  return reviews;
};
export const deleteReview = async (review: any) => {
  const result = await axios.delete(`${API_URL}/reviews/${review._id}`);
  console.log('Result ', result);
  const reviews = await result.data.data.review;
  return reviews;
};
