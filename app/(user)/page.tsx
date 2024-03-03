'use client';

import React, { useEffect, useState } from 'react';
import {
  cartSlice,
  selectBooks,
  selectCarts,
  useDispatch,
  useSelector,
} from '@/lib/redux';
import Book from '@/lib/redux/slices/bookSlice/book';
import BooksList from '../components/User/BookList';
import { loadAllBook } from '@/lib/redux/slices/bookSlice/thunks';

function Indexpage() {
  const dispatch = useDispatch();
  //let cart = useSelector(selectCarts);
  let [loading, setLoading] = useState(true);
  let [pagin, setPagin] = useState({
    page: 1,
    limit: 4,
  });
  const books: Book[] = useSelector(selectBooks);
  useEffect(() => {
    dispatch(loadAllBook(pagin))
      .unwrap()
      .then(() => {
        setLoading(false);
      });
  }, [pagin]);

  const addToCart = (items: any) => {
    //let data = cart.filter((item) => item.book === items.book);
    //console.log(data);

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
      {loading && (
        <div className="font-bold text-center py-auto"> just a sec...</div>
      )}
      {!books.length && (
        <div className="font-bold text-center py-auto pt-6"> No Book founds</div>

      )}
      {!!books.length && !loading &&
        (
          <>
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
          </>,
        )}
    </div>
  );
}
export default Indexpage;
