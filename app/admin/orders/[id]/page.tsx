'use client';

//import React from 'react';
//import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  getOrderById,
  updateOrder,
} from '@/lib/redux/slices/orderSlice/thunks';
import { selectOrders, useSelector } from '@/lib/redux';

export default function Page({ params }: { params: { id: number } }) {
  const dispatch = useDispatch();
  const order = useSelector(selectOrders);
  let subtotal = 0;

  useEffect(() => {
    const data = { _id: params.id };
    dispatch(getOrderById(data))
      .unwrap()
      .then((data) => {});
  }, []);

  const updateOrderStatus = (status: any) => {
    const order = { status, _id: params.id };
    dispatch(updateOrder(order)).unwrap();
  };

  return (
    <div className=" h-screen md:px-16 ">
      <div className="bg-white md:w-2/5 border h-52 mt-10  shadow px-4 pt-3">
        <h1 className="font-bold text-2xl">Order Info</h1>
        {!!order.length && (
          <div className=" pt-6 space-y-3">
            <div className="flex item-center justify-start gap-10">
              <div className="ml-3 flex item-centers gap-3">
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
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                Name
              </div>
              <div className="">{order[0].name}</div>
            </div>
            <div className="flex item-centers justify-start gap-9">
              <div className="ml-3 flex item-centers gap-3">
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
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                Phone
              </div>
              <div className="">{order[0].phone}</div>
            </div>
            <div className="flex item-centers justify-start gap-6">
              <div className="ml-3 flex item-centers gap-3">
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
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span>address</span>
              </div>
              <div className="">{order[0].address}</div>
            </div>
            <div className="flex item-centers justify-start gap-12" />
          </div>
        )}
      </div>

      <div className="mt-6">
        {!!order.length && (
          <table className="table-auto w-full border-separate border-spacing-y-7">
            <thead className="">
              <tr className="">
                <th className="border-b pb-4 text-start">PROUDCT</th>

                <th className="border-b pb-4 text-start">QUANTITY</th>
                <th className="border-b pb-4 text-start">TOTAL</th>
              </tr>
            </thead>
            {order.length &&
              order[0].orderItem.map((item) => {
                subtotal += item.book.price * item.qty;

                return (
                  <tbody className="">
                    <tr className="">
                      <td className="border-b pb-5">{item.book.title}</td>

                      <td className="border-b pb-5">
                        <div className="">{item.qty}</div>
                      </td>
                      <td className="border-b pb-5">
                        {' '}
                        {item.qty * item.book.price}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        )}

        {!!order.length && !!order[0].orderItem.length && (
          <div className="text-right mr-16">
            Subtotal: {subtotal}
            <div className="pt-3">
              <select
                value={order[0].status}
                onChange={(e) => {
                  updateOrderStatus(e.target.value);
                }}
                className="text-center py-1 rounded px-3"
              >
                <option value="Pending">Pending</option>
                <option value="Finish">Finish</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
