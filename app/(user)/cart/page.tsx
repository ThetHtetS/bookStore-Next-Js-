'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import {
  cartSlice,
  selectBooks,
  selectCarts,
  useDispatch,
  useSelector,
} from '@/lib/redux';
import { loadAllBook } from '@/lib/redux/slices/bookSlice/thunks';

export default function Cart() {
  const books = useSelector(selectBooks);
  const cart = useSelector(selectCarts);
  const dispatch = useDispatch();
  let subtotal = 0;

  useEffect(() => {
    dispatch(loadAllBook()).unwrap();
    // .then((data) => console.log('Response from thunk ', data));
  }, []);

  const increaseQty = (data: any) => {
    const qtynew = data.qty + 1;
    const newData = { _id: data._id, book: data.book, qty: qtynew };
    dispatch(cartSlice.actions.updateCart(newData));
  };

  const DecreaseQty = (data: any) => {
    let qtynew;
    if (data.qty === 1) {
      qtynew = data.qty;
    } else {
      qtynew = data.qty - 1;
    }
    const newData = { _id: data._id, book: data.book, qty: qtynew };
    dispatch(cartSlice.actions.updateCart(newData));
  };

  const deleteCart = (data: any) => {
    dispatch(cartSlice.actions.deleteCart(data));
  };

  return (
    <div className="px-12">
      <div className="w-full text-right pr-14  py-4">
        <h1 className="font-bold text-2xl">YOUR CART</h1>
        {!cart.length && <p className="pt-3">Your cart is Empty</p>}
      </div>

      {!!cart.length && (
        <table className="table-auto w-full border-separate border-spacing-y-7">
          <thead className="">
            <tr className="">
              <th className="border-b pb-4 text-start">PROUDCT</th>
              <th className="border-b pb-4 text-start">PRICE</th>
              <th className="border-b pb-4 text-start">QUANTITY</th>
              <th className="border-b pb-4 text-start">TOTAL</th>
            </tr>
          </thead>
          {cart.map((item) => {
            const book = books.filter((el) => el._id === item.book);

            subtotal += book[0].price * item.qty;

            return (
              <tbody className="">
                <tr className="">
                  <td className="border-b pb-5">
                    {book[0].title}
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => deleteCart({ _id: item._id })}
                        className="underline"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                  <td className="border-b pb-5">{book[0].price}</td>
                  <td className="border-b pb-5">
                    <div className="-ml-2 flex items-center gap-1">
                      <button
                        type="button"
                        aria-label="decrease"
                        onClick={() =>
                          DecreaseQty({
                            _id: item._id,
                            book: item.book,
                            qty: item.qty,
                          })
                        }
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
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                      <div className="border px-4">{item.qty}</div>
                      <button
                        type="button"
                        aria-label="increase"
                        onClick={() =>
                          increaseQty({
                            _id: item._id,
                            book: item.book,
                            qty: item.qty,
                          })
                        }
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
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="border-b pb-5">{item.qty * book[0].price}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      )}

      {!!cart.length && (
        <div className="text-right mr-16">
          Subtotal:
          {subtotal}
          <div className="pt-3">
            <Link href="/checkout">
              <button
                type="button"
                className="px-3 py-1 rounded-lg bg-black text-white"
              >
                Check Out
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
