'use client';

//import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

import '@smastrom/react-rating/style.css';
import {
  deleteReviewAsync,
  getAllReviewByBookAsync,
  saveReviewAsync,
  selectBooks,
  selectReviews,
  updateReviewAsync,
  useDispatch,
  useSelector,
} from '@/lib/redux';
import { getBook } from '@/lib/redux/slices/bookSlice/thunks';
import Review from '@/lib/redux/slices/reviewSlice/Review';
import SaveOrEditReview from '@/app/components/User/saveOrEditReview';
import BookDetail from '@/app/components/User/BookDetail';
import ReviewList from '@/app/components/User/ReviewList';

export default function Indexpage({ params }: { params: { id: number } }) {
  const dispatch = useDispatch();
  const book = useSelector(selectBooks);
  const reviews = useSelector(selectReviews);
  const bookId = params.id;
  const [reviewToEdit, setReviewToEdit] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const data = { _id: params.id };
    dispatch(getBook(data)).unwrap();
    // .then((data) => {});
    dispatch(getAllReviewByBookAsync(data));
  }, []);

  const saveOrUpdateReview = (newReview: Review) => {
    //const uid = localStorage.getItem('Uid');

    const data = {
      ...newReview,
      //  uid,
      book: params.id,
      rating: rating,
    };
    if (reviewToEdit) {
      dispatch(updateReviewAsync({ ...data, _id: reviewToEdit._id }));
    } else {
      dispatch(saveReviewAsync(data));
    }
  };

  const deleteHandler = (review: object) => {
    dispatch(deleteReviewAsync(review));
  };
  return (
    <div>
      <BookDetail book={book} />
      <div className="grid place-items-center border-t mt-12 pt-6">
        {!reviews.some(
          (item) => item.uid._id === localStorage.getItem('Uid'),
        ) && (
          <SaveOrEditReview
            saveOrUpdateReview={saveOrUpdateReview}
            rating={rating}
            setRating={setRating}
            reviewToEdit={reviewToEdit}
            setReviewToEdit={setReviewToEdit}
          />
        )}
      </div>
      <ReviewList
        reviews={reviews}
        deleteHandler={deleteHandler}
        bookId={bookId}
        reviewToEdit={reviewToEdit}
        setReviewToEdit={setReviewToEdit}
        setRating={setRating}
        rating={rating}
      />
    </div>
  );
}
