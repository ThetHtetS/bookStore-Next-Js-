import React from 'react';
import Book from '@/lib/redux/slices/bookSlice/book';

export default function BookDetail(props: {
  book: Book[];
  addToCart: (t: object) => void;
  fetchReview: (t: object) => void;
}) {
  const { book, addToCart, fetchReview } = props;
  let id = 0;
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
          <div className=" px-12 space-y-4 pt-4 max-w-[700px]">
            <h1 className=" text-2xl">{book[0].title}</h1>
            <div className="italic"> {book[0].author} </div>
            <p className="text-blue-500">{book[0].category.name}</p>
            <div>
              <span
                className={`${book[0].discountPrice ? 'line-through' : ''} `}
              >
                {book[0].price}
              </span>
              <span className="text-green-600">
                {' '}
                {!!book[0].discountPrice && book[0].discountPrice}
              </span>
              <span className="text-bold"> MMK</span>
            </div>
            <div> {book[0].description}</div>
            <button
              type="button"
              onClick={() => {
                addToCart({
                  _id: id++,
                  book: book[0]._id,
                  title: book[0].title,
                  qty: 1,
                  price: book[0].price,
                });
              }}
              className="border bg-yellow-200 mt-2 rounded px-1 py-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white p-1 rounded-lg ml-3"
              onClick={fetchReview}
            >
              Reviews
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
