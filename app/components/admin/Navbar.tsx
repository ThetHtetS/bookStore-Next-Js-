'use client';

import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import {
  fetchNoti,
  notiSlice,
  selectNoti,
  useDispatch,
  useSelector,
} from '@/lib/redux';
import Noti from '@/lib/redux/slices/notiSlice/notification';
import Link from 'next/link';

export default function Navbar({ sideHandle }) {
  const [hide, setHide] = useState(true);
  const notification: Noti[] = useSelector(selectNoti);
  const dispatch = useDispatch();
  const socket = useRef();
  useEffect(() => {
    socket.current = io('http://localhost:4000');
    const userId = localStorage.getItem('Uid');
    socket.current.emit('add-user', userId);
  }, []);
  useEffect(() => {
    dispatch(fetchNoti());
  }, []);
  useEffect(() => {
    socket.current.on('order', (data) => {
      dispatch(notiSlice.actions.addNoti(data));
    });
  }, []);
  return (
    <nav className="h-10 w-full bg-zinc-500 px-3 shadow relative">
      <div className="flex justify-between items-center pt-1">
        <div>
          {/* menu button */}
          <button type="button" aria-label="side" onClick={sideHandle}>
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        {/* search input */}
        {/* <div className="ml-3 flex items-center border bg-white gap-3 px-2 rounded-full">
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

          <div className="hidden md:flex items-center gap-3">
            <input
              type="text"
              placeholder="Search here..."
              className="outline-none w-24 md:w-auto"
            />
            <button
              type="button"
              className="  px-1 md:px-3 py-1 border-l flex items-center"
            >
              <span className="">search</span>
            </button>
          </div>
        </div> */}
        {/* search input end */}
        <div className="flex items-center gap-3 ">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setHide(!hide);
              }}
            >
              {/* noti icon */}
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
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                />
              </svg>
            </button>
            <span className="absolute top-1 left-4 bg-white rounded-lg px-1">
              {' '}
              {notification.length ? notification.length : ''}
            </span>
          </div>

          <button type="button" className="pb-1">
            {/* user icon */}
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
          </button>
        </div>
      </div>
      <div
        className={`w-[250px] h-[400px] border bg-slate-300 shadow right-10 rounded-lg absolute ${hide ? 'hidden' : ''}`}
      >
        <div className="border-b shadow p-3 text-center"> Notifications</div>
        <div>
          {notification.map((item) => (
            <div className="text-center bg-white shadow border py-3">
              <Link
                href={`/admin/orders/${item.orderId}`}
              >{`New Order from ${item.uid.name}`}</Link>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
