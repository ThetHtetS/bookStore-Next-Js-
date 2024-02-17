import React, { useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import Review from '@/lib/redux/slices/reviewSlice/Review';
import { reviewSlice, useDispatch } from '@/lib/redux';

export default function ReviewList(props: {
  reviews: Review[];
  deleteHandler: (review: any) => void;
  bookId: number;
  reviewToEdit;
  setReviewToEdit;
  rating;
  setRating;
}) {
  const [hidden, setHidden] = useState(true);
  let dispatch = useDispatch();
  const {
    reviews,
    deleteHandler,
    bookId,
    reviewToEdit,
    rating,
    setRating,
    setReviewToEdit,
  } = props;
  return (
    <div className="grid md:grid-cols-4 gap-6 px-8 pb-20">
      {!!reviews.length &&
        reviews.map((item) => (
          <div className="mt-8 px-3 py-3 border shadow  pb-10">
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
                      deleteHandler({ _id: item._id, book: bookId })
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
            <div className="mt-3 text-blue-700">
              <button
                type="button"
                onClick={() => {
                  dispatch(reviewSlice.actions.deleteReview({ _id: item._id }));
                  setReviewToEdit(item);
                  setRating(item.rating);
                }}
              >
                Edit Your Review
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
