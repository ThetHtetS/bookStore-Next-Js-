'use client';

import React, { useEffect, useState } from 'react';
import { cartSlice, selectBooks, useDispatch, useSelector } from '@/lib/redux';
import Book from '@/lib/redux/slices/bookSlice/book';
import BooksList from '../components/User/BookList';
import IsAuth from '@/app/components/auth/isAuth';
import { loadAllBook } from '@/lib/redux/slices/bookSlice/thunks';

function Indexpage() {
  const dispatch = useDispatch();
  let [pagin, setPagin] = useState({
    page: 1,
    limit: 4,
  });
  const books: Book[] = useSelector(selectBooks);
  useEffect(() => {
    dispatch(loadAllBook(pagin)).unwrap();
    //.then((data) => console.log('Response from thunk ', data));
  }, [pagin]);

  const addToCart = (items: any) => {
    dispatch(cartSlice.actions.addCart(items));
  };

  const next = () => {
    setPagin({ page: pagin.page + 1, limit: 4 });
  };
  const previous = () => {
    setPagin({ page: pagin.page - 1, limit: 4 });
  };

  return (
    <div className="mx-4">
      {/* <div className={`h-72 bg-[url('https://images.pexels.com/photos/12064/pexels-photo-12064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]`}>
      </div> */}
      <BooksList books={books} addToCart={addToCart} />
      <div className=" px-4 py-3 sm:px-6 ">
        <div className="flex items-center justify-between  ">
          <div
            onClick={previous}
            className={`relative inline-flex items-center rounded-md border border-gray-300  px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 `}
          >
            Previous
          </div>
          <div
            onClick={next}
            className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium  `}
          >
            Next
          </div>
        </div>
      </div>
    </div>
  );
}
export default IsAuth(Indexpage);
