'use client';

import Link from 'next/link';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar, Line } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import {
  getLength,
  selectMonthlyOrders,
  useDispatch,
  useSelector,
} from '@/lib/redux';
import IsAdmin from '@/app/components/auth/isAdmin';
import {
  getDailySales,
  getMonthlyOrder,
} from '@/lib/redux/slices/orderSlice/thunks';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function IndexPage() {
  interface Data {
    user: number;
    book: number;
    category: number;
    number: number;
  }

  const dispatch = useDispatch();
  const [data, setData] = useState(); //no slice for this data
  const monthlyOrders: [] = useSelector(selectMonthlyOrders);
  useEffect(() => {
    dispatch(getLength())
      .unwrap()
      .then((res: Data) => setData(res));
    dispatch(getMonthlyOrder('2024'));
    dispatch(getDailySales());
  }, []);

  // useEffect(() => {
  //   const socket = io('http://localhost:4000');
  //   const userId = localStorage.getItem('Uid');
  //   socket.emit('add-user', userId);
  //   socket.on('order', (msg) => {
  //     console.log('new order', msg);
  //   });
  // }, []);

  return (
    <div className="pt-12 px-12">
      {!!data && (
        <div className="grid  md:grid-cols-3 lg:grid-cols-4 gap-12 ">
          <Link href="/admin/users">
            <div className="border shadow py-12 w-full px-6 text-center text-amber-500">
              <div className="text-2xl text-center">{data.user}</div>
              Total Users
            </div>
          </Link>
          <Link href="/admin/books">
            <div className="border shadow py-12 w-full  px-4 text-center text-green-700">
              <div className="text-2xl text-center"> {data.book}</div>
              Total Books
            </div>
          </Link>
          <Link href="/admin/category">
            <div className="border shadow py-12 w-full px-6 text-center text-blue-600">
              <div className="text-2xl text-center">{data.category}</div>
              Categories
            </div>
          </Link>
          <Link href="/admin/orders">
            <div className="border shadow py-12 w-full px-12 text-center text-fuchsia-950">
              <div className="text-2xl text-center"> {data.order} </div>
              Orders
            </div>
          </Link>
        </div>
      )}
      {!!monthlyOrders.length && (
        <div className="w-[500px] shadow-lg rounded-lg p-3">
          <Bar
            data={{
              labels: monthlyOrders.map((item) => item.month),
              datasets: [
                {
                  label: 'Totel Sale Item',
                  data: monthlyOrders.map((item) => item.totalItem),
                  backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(201, 203, 207, 1)',
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                  ],
                  borderWidth: 0.5,
                },
                {
                  label: 'Totel Sale Amount',
                  data: monthlyOrders.map((item) => item.totalAmount),
                  backgroundColor: [
                    'rgba(255, 10, 132, 1)',
                    'rgba(255, 19, 64, 1)',
                    'rgba(255, 105, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(201, 203, 207, 1)',
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                  ],
                  borderWidth: 0.5,
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Monthly Sales',
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
//export default IsAdmin(IndexPage);
export default IndexPage;
