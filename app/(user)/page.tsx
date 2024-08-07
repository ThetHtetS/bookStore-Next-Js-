'use client';

import React, { useEffect, useState } from 'react';
import {
  cartSlice,
  selectBestSeller,
  selectBooks,
  selectTopFive,
  useDispatch,
  useSelector,
} from '@/lib/redux';
import Book from '@/lib/redux/slices/bookSlice/book';
import BooksList from '../components/User/BookList';
import {
  getBestSeller,
  getTopFive,
  loadAllBook,
} from '@/lib/redux/slices/bookSlice/thunks';
import { NewCart } from '@/lib/redux/slices/cartSlice/thunks';

function Indexpage() {
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(true);
  let [pagin, setPagin] = useState({
    page: 1,
    limit: 4,
  });
  const books: Book[] = useSelector(selectBooks);
  const topFive: Book[] = useSelector(selectTopFive);
  const bestSeller: Book[] = useSelector(selectBestSeller);

  useEffect(() => {
    dispatch(loadAllBook(pagin))
      .unwrap()
      .then(() => {
        setLoading(false);
      });
    dispatch(getTopFive());
    dispatch(getBestSeller());
  }, [pagin]);

  const addToCart = (items: any) => {
    const uid = localStorage.getItem('Uid');
    let cart = { ...items, uid };
    console.log(cart);

    dispatch(NewCart(cart));
  };

  const next = () => {
    setPagin({ page: pagin.page + 1, limit: 4 });
  };
  const previous = () => {
    setPagin({ page: pagin.page - 1, limit: 4 });
  };

  return (
    <div className="mx-4 w-auto pb-[50px]">
      {loading && (
        <div className="font-bold text-center py-auto"> just a sec...</div>
      )}
      {!books.length && (
        <div className="font-bold text-center py-auto pt-6">
          {' '}
          No Book founds
        </div>
      )}
      <div className="py-1">
        <div className="bg-blue-900 text-center py-3 text-white">
          Best Popular
        </div>
        <div className="">
          {!!topFive.length && !loading && (
            <BooksList books={topFive} addToCart={addToCart} />
          )}
        </div>
      </div>
      <div className="py-3">
        <div className="bg-green-900 text-center py-3 text-white">
          Best Seller
        </div>
        <div className="">
          {!!bestSeller.length && !loading && (
            <BooksList books={bestSeller} addToCart={addToCart} />
          )}
        </div>
      </div>
      {/* {!!books.length && !loading &&
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
        )} */}
    </div>
  );
}
export default Indexpage;
