'use client';

import React from 'react';
import { Field, Form, Formik } from 'formik';
import { Rating } from '@smastrom/react-rating';

export default function SaveOrEditReview(props: {
  saveOrUpdateReview;
  reviewToEdit;
  setReviewToEdit;
  rating;
  setRating;
}) {
  const {
    rating,
    setRating,
    // setReviewToEdit,
    reviewToEdit,
    saveOrUpdateReview,
  } = props;

  return (
    <div className="space-y-2 pb-20 md:w-1/2 ">
      <div className="grid place-items-center">Rate this Book</div>
      <Formik
        initialValues={{
          review: reviewToEdit ? reviewToEdit.review : '',
        }}
        //  validationSchema={ReviewSchema}
        onSubmit={(values: any) => {
          saveOrUpdateReview(values);
        }}
        enableReinitialize={true}
      >
        {() => (
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
  );
}
