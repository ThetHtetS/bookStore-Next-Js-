'use client';

import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';

import '@smastrom/react-rating/style.css';
import {
  deleteReviewAsync,
  getAllReviewByBookAsync,
  saveReviewAsync,
  selectBooks,
  selectReviews,
  useDispatch,
  useSelector,
} from '@/lib/redux';
import { getBook } from '@/lib/redux/slices/bookSlice/thunks';
import Review from '@/lib/redux/slices/reviewSlice/Review';

export default function Indexpage({ params }: { params: { id: number } }) {
  const dispatch = useDispatch();
  const book = useSelector(selectBooks);
  const reviews = useSelector(selectReviews);
  const [hidden, setHidden] = useState(true);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const data = { _id: params.id };
    dispatch(getBook(data)).unwrap();
    // .then((data) => {});
    dispatch(getAllReviewByBookAsync(data));
  }, []);

  const saveReview = (newReview: Review) => {
    //const uid = localStorage.getItem('Uid');
    const data = {
      ...newReview,
      //  uid,
      book: params.id,
      rating: rating,
    };

    dispatch(saveReviewAsync(data));
  };

  const deleteHandler = (review: object) => {
    dispatch(deleteReviewAsync(review));
  };
  return (
    <div>
      {!!book.length && (
        <div className="flex gap-12 px-24 pt-4">
          <div className="text-center md:w-80">
            <img
              alt="book cover"
              src={`http://localhost:4000/images/books/${book[0].photo}`}
              className="w-80"
            />
          </div>
          <div className=" px-24 space-y-4 pt-4">
            <h1 className=" text-2xl">{book[0].title}</h1>
            <p className="">{book[0].category.name}</p>
            <p>
              {book[0].price}
              MMK
            </p>
          </div>
          {/* <button type="button" onClick={() => fetchReview()}>
            REVIEWS
          </button> */}
        </div>
      )}
      <div className="grid place-items-center border-t mt-12 pt-6">
        {!reviews.some(
          (item) => item.uid._id === localStorage.getItem('Uid'),
        ) && (
          <div className="space-y-2 pb-20 md:w-1/2 ">
            <div className="grid place-items-center">Rate this Book</div>

            <div className="">
              <Formik
                initialValues={{
                  review: '',
                }}
                //  validationSchema={ReviewSchema}
                onSubmit={(values: any) => {
                  saveReview(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form className="space-y-2">
                    <div className="grid place-items-center">
                      <Rating
                        style={{ maxWidth: 250 }}
                        value={rating}
                        onChange={setRating}
                      />
                    </div>
                    <div className="">
                      <Field
                        as="textarea"
                        name="review"
                        placeholder="Write your experience"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20
                                                    text-gray-900 ring-1 placeholder:text-gray-400
                                                        sm:text-sm sm:leading-6"
                      />
                    </div>
                    <button
                      type="submit"
                      className=" w-full justify-center rounded-md bg-green-600 px-3 py-2 text-white"
                    >
                      Send
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}
      </div>
      <div className="grid md:grid-cols-4 gap-6 px-8 pb-20">
        {!!reviews.length &&
          reviews.map((item) => (
            <div className="mt-8 px-3 py-3 border shadow  pb-10">
              {/* <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </span> */}
              <div className="flex items-center justify-between relative">
                <div>{item.uid.name}</div>
                {item.uid._id === localStorage.getItem('Uid') && (
                  <>
                    <button
                      className=""
                      type="button"
                      onClick={() => setHidden(!hidden)}
                      aria-label="delete"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                        />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteHandler({ _id: item._id, book: params.id })
                      }
                      className={`absolute right-2 -top-8 rounded-lg bg-slate-50 border px-2 py-1 ${hidden ? 'hidden' : ''}`}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>

              <Rating style={{ maxWidth: 100 }} value={item.rating} />
              <div className="w-30">
                {/* {item.uid._id === localStorage.getItem('Uid') && (
                  <button
                    aria-label="delete"
                    type="button"
                    onClick={() => deleteHandler({ _id: item._id })}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                )} */}
                {item.review}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
