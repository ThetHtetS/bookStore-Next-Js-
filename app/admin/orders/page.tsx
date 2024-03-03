'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  getOrderByDateRange,
  loadAllOrder,
} from '@/lib/redux/slices/orderSlice/thunks';
import {
  selectBooks,
  selectOrders,
  useDispatch,
  useSelector,
  getLength,
} from '@/lib/redux';

export default function page() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();
  const [data, setData] = useState(); //no slice for this data
  const [status, setStatus] = useState('All');
  let [pagin, setPagin] = useState({
    page: 1,
    limit: 4,
  });

  useEffect(() => {
    let q = { status, ...pagin };
    dispatch(loadAllOrder(q)).unwrap();
    //.then((data) => {});
  }, [pagin, status]);

  useEffect(() => {
    dispatch(getLength())
      .unwrap()
      .then((res: Data) => setData(res));
  }, []);

  const getOrderByDate = () => {
    const data = { start: startDate.toISOString(), end: endDate.toISOString() };
    dispatch(getOrderByDateRange(data));
  };

  let totalPage =
    (!!data && Math.floor((data.order * 1) / pagin.limit) + 1) || 1;

  const next = () => {
    totalPage !== pagin.page && setPagin({ page: pagin.page + 1, limit: 4 });
  };
  const previous = () => {
    pagin.page !== 1 && setPagin({ page: pagin.page - 1, limit: 4 });
  };

  return (
    <div>
      <div className=" h-screen pt-3">
        <div className="flex justify-between items-center my-2 px-3">
          <select
            onChange={(e) => {
              setStatus(e.target.value);
            }}
            name="cars"
            id="cars"
            className="text-center py-1 rounded px-3"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Finish">Finish</option>
          </select>
          <div className="ml-36">
            <div className=" flex items-center gap-3 ml-5 ">
              <div className="flex gap-3 -ml-3">
                <div className="border ">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                <div className="border">
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                  />
                </div>
              </div>

              <button
                type="button"
                aria-label="getbydate"
                onClick={getOrderByDate}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="px-3 mt-3">
          {!orders.length && (
            <div className="text-red-400 text-center py-20">
              {' '}
              No Order result!{' '}
            </div>
          )}
          {!!orders.length && (
            <table className="table w-full px-2 text-left border-separate border-spacing-y-5">
              <thead className=" bg-slate-200 border-spacing-y-40">
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr className="border-b hover:bg-slate-200 py-2">
                    <td className="text-primary">{order.name}</td>
                    <td>{order.phone}</td>
                    <td
                      className={`${order.status === 'Pending' ? 'text-red-500' : 'text-green-500'}`}
                    >
                      {order.status}
                    </td>
                    <td aria-label="orderDetail">
                      <Link href={`/admin/orders/${order._id}`}>
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
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                          />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {!!orders.length && (
          <div className="flex items-center justify-center gap-3 md:-ml-12 lg:absolute lg:bottom-12 lg:right-1/3  ">
            <div
              onClick={previous}
              className={`relative text-xl inline-flex items-center rounded-md border border-gray-300  px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 `}
            >
              &lt;&lt;&lt;
            </div>
            <div>
              page
              {' ' + pagin.page + ' '}
              of {!!data && ' ' + totalPage + ' '}
            </div>
            <div
              onClick={next}
              className={`relative ml-3 text-xl inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium  `}
            >
              &gt;&gt;&gt;
            </div>
          </div>
        )}
      </div>
      <div />
    </div>
  );
}
