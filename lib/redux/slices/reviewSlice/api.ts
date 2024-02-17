import { API_URL } from '@/app/setting/API';
import axios from '@/app/setting/our_axios';

export const getReviews = async (bookId: string) => {
  const result = await axios.get(`${API_URL}/books/${bookId._id}/reviews`);
  const reviews = await result.data.review;
  return reviews;
};

export const saveReview = async (review: any) => {
  const result = await axios.post(
    `${API_URL}/books/${review.book}/reviews`,
    review,
  );
  const reviews = await result.data.review;
  return reviews;
};
export const updateReview = async (review: any) => {
  const result = await axios.patch(
    `${API_URL}/books/${review.book}/reviews/${review._id}`,
    review,
  );
  const reviews = await result.data.review;
  return reviews;
};
export const deleteReview = async (review: any) => {
  const result = await axios.delete(
    //`${API_URL}/reviews/${review._id}`,
    `${API_URL}/books/${review.book}/reviews/${review._id}`,
  );
  const reviews = await result.data.review;
  return reviews;
};
