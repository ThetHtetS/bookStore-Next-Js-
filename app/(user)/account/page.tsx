'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  deleteMeAsync,
  selectOrders,
  useDispatch,
  useSelector,
} from '@/lib/redux';
import { getOrderByUserId } from '@/lib/redux/slices/orderSlice/thunks';

export default function page() {
  const yourOrder = useSelector(selectOrders);
  const dispatch = useDispatch();
  const router = useRouter();
  const token = localStorage.getItem('token');
  const MySwal = withReactContent(Swal);

  if (!token) {
    router.push('/account/login');
  }
  useEffect(() => {
    const uid: string = localStorage.getItem('Uid') || '';
    dispatch(getOrderByUserId(uid));
  }, []);

  const username = localStorage.getItem('username');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('Uid');
    localStorage.removeItem('username');
    router.push('/account/login');
  };

  const deleteAccount = () => {
    MySwal.fire({
      title: 'Are you sure you want to delete your account',
      text: 'Delete Account',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteMeAsync())
          .unwrap()
          .then((res) => {
            MySwal.fire(res.message);
            router.push('/');
          });
      }
    });

    // MySwal.fire({
    //   title: 'Are you sure?',
    //   text: 'Are you sure that you want to delete your account?',
    //   icon: 'warning',
    //   dangerMode: true,
    // }).then((willDelete) => {
    //   if (willDelete) {
    //     dispatch(deleteMeAsync())
    //       .unwrap()
    //       .then((res) => {
    //         MySwal.fire(res.message);
    //         router.push('/');
    //       });
    //   }
    // });
  };

  return (
    <div>
      <div className="text-center">
        <span className="text-3xl">My Account</span>
        <p>{username}</p>
        <p>
          <button
            type="button"
            onClick={logout}
            className="bg-red-300 rounded-sm px-2 py-1 border"
          >
            Log out
          </button>
          <button
            type="button"
            onClick={deleteAccount}
            className="bg-red-300 rounded-sm px-2 py-1 border"
          >
            Delete My Account
          </button>
        </p>
      </div>

      <div className="px-10 mt-3">
        <div className="text-right mr-16">
          <span className="text-2xl">Your Order</span>
          <br />
          {!yourOrder.length && <span>You have no Order</span>}
        </div>
        {!!yourOrder.length && (
          <table className="table-auto w-full border-separate border-spacing-y-7">
            <thead className="">
              <tr className="">
                <th className="border-b pb-4 text-start">PROUDCT</th>
                <th className="border-b pb-4 text-start">Status</th>
                <th className="border-b pb-4 text-start">PRICE</th>
                <th className="border-b pb-4 text-start">QUANTITY</th>
                <th className="border-b pb-4 text-start">TOTAL</th>
              </tr>
            </thead>
            {yourOrder.map((item) =>
              item.orderItem.map((el) => (
                // subtotal += book[0].price* item.qty;
                <tbody>
                  <tr>
                    <td className="border-b pb-5">{el.book.title}</td>
                    <td className="border-b pb-5 -ml-8">{item.status}</td>
                    <td className="border-b pb-5">{el.book.price}</td>
                    <td className="border-b pb-5">
                      <div className=" px-4">{el.qty}</div>
                    </td>
                    <td className="border-b pb-5"> {el.qty * el.book.price}</td>
                  </tr>
                </tbody>
              )),
            )}
          </table>
        )}
      </div>
    </div>
  );
}
