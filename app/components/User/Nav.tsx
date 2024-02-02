'use client';

import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import SearchInput from './SearchInput';
import { selectCarts, useDispatch, useSelector } from '@/lib/redux';
import { getBookByTitle } from '@/lib/redux/slices/bookSlice/thunks';

export default function Nav() {
  const pathname = usePathname();
  const cart = useSelector(selectCarts);
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const dispatch = useDispatch();
  const user = 'hello';
  const isDark = false;

  const menuBtn = () => {
    setMenuActive(!menuActive);
  };
  const SearchHandle = () => {
    setActive(!active);
  };
  const SearchBook = (title: string) => {
    dispatch(getBookByTitle(title));
  };

  return (
    <>
      <nav
        className={`w-full mb-8   border shadow border-b-1 ${isDark ? 'bg-dbg' : ''}  py-2 `}
      >
        <ul className="px-3">
          <div className="md:hidden flex h-16 items-center justify-between">
            {/* moblie Nav bar */}
            <div className="flex items-center gap-2 ml-3">
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
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
              <p>BookStore</p>
            </div>

            <div className="flex items-center gap-5 ">
              <div onClick={SearchHandle} className=" ">
                {/* search icon */}
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
              </div>
              <div className="">
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
              </div>
              <div>
                {/* cart icon */}

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
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
              <div>
                {/* <!-- Mobile menu button--> */}
                <button
                  onClick={menuBtn}
                  type="button"
                  className="p-1 inline-flex items-center justify-center rounded-md  hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  {/* <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span> */}
                  {/* <!--
                Icon when menu is closed.

                Menu open: "hidden", Menu closed: "block"
                --> */}
                  <svg
                    className={`${menuActive ? 'hidden' : 'block'} h-6 w-6`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>

                  {/* <!--
                Icon when menu is open.

                Menu open: "block", Menu closed: "hidden"
                    --> */}
                  <svg
                    className={`${menuActive ? 'block' : 'hidden'} h-6 w-6`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* moblie nav bar end */}
          </div>

          {/* PC Menu Bar */}
          <div className="hidden md:flex justify-between items-center max-w-5xl mx-auto py-2">
            <div className="flex gap-2">
              {/* book icon */}
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
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
              <p>BookStore</p>
            </div>
            {/* search box */}
            {/* <div className="flex items-center border bg-white gap-3 px-2 py-1 rounded-xl">
                    <div className={`hidden md:flex items-center gap-3`}>
                    <input value={search} onChange={e => setSearch(e.target.value)} 
                    type="text" placeholder="Search filters..." 
                    className="outline-none w-24 md:w-auto" />
                    <button  className="  px-1 md:px-3 py-1 border-l flex items-center">
                            <span className="">search</span>
                    </button>
                    </div>
            </div> */}

            <div className="flex items-center gap-5">
              <Link
                href="/"
                className={`flex items-center ${pathname === '/' ? 'border-b-indigo-600 text-indigo-600' : ''}`}
              >
                <span className=" text-primary">Home</span>
              </Link>
              <Link
                href="/about"
                className={`flex items-center ${pathname === '/about' ? 'border-indigo-600 text-indigo-600' : ''}`}
              >
                <span className=" text-primary">About</span>
              </Link>

              <Link
                href="/admin/category"
                className={`flex items-center ${pathname === '/category' ? 'border-indigo-600 text-indigo-600' : ''}`}
              >
                <span className="text-primary">Category</span>
              </Link>
            </div>

            <div className="flex items-center gap-5 ">
              <button type="button" onClick={SearchHandle}>
                {/* search icon */}
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
              <Link href="/account/login">
                <div className="">
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
                </div>
              </Link>

              <div>
                <Link href="/cart" className="relative">
                  {/* cart icon */}
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
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <span className="absolute top-1 left-4 text-white bg-black rounded-lg px-1">
                    {' '}
                    {cart.length ? cart.length : ''}
                  </span>
                </Link>
              </div>
              <div />
            </div>
          </div>
          {/* PC Menu Bar end */}
        </ul>

        {/* mobile menu list */}
        <div
          className={`${menuActive ? 'block' : 'hidden'} md:hidden absolute bg-white w-full `}
          id="mobile-menu"
        >
          <button
            type="button"
            aria-label="menu"
            onClick={menuBtn}
            className="space-y-1 px-2 pb-3 pt-2"
          >
            <Link href="/" className="flex items-center gap-2  py-1">
              <span className="mx-2 text-primary">Home</span>
            </Link>
            <Link href="/about" className="flex items-center gap-2 ml-2 py-1 ">
              <span className=" text-primary">about</span>
            </Link>
            <div>category</div>
          </button>
        </div>
      </nav>
      <div className={`${active ? '' : 'hidden'}`}>
        <SearchInput SearchHandle={SearchHandle} searchBook={SearchBook} />
      </div>
    </>
  );
}
