import React from 'react';
import Book from '@/lib/redux/slices/bookSlice/book';

export default function BookDetail(props: { book: Book[] }) {
  const { book } = props;
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
        </div>
      )}
    </div>
  );
}
