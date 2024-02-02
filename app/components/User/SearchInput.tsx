import React, { useState } from 'react';

import { selectBooks, useSelector } from '@/lib/redux';
import BooksList from './BookList';

export default function SearchInput({ SearchHandle, searchBook }) {
  const [search, setSearch] = useState('');
  const books = useSelector(selectBooks);
  const [show, setShow] = useState(false);
  // const searchBtn = () => {
  //   setShow(true);
  // };
  const closeBtn = () => {
    SearchHandle();
    setSearch('');
    setShow(false);
  };

  return (
    <div
      className=" z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* <!--
      Background backdrop, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-90 transition-opacity" />

      <div className="fixed inset-0  bg-white z-10 w-screen  ">
        <div className="flex  items-end justify-center p-4 text-center sm:items-center sm:p-0">
          {/* <!--
          Modal panel, show/hide based on modal state.

          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        --> */}
          <div className="relative transform overflow-hidden rounded-lg bg-white text-center  transition-all  w-full sm:max-w-sms">
            <div className="bg-white  pb-4 pt-5 p-6 w-full">
              <div className="flex px-5 md:px-20 items-center gap-3 w-full">
                <button type="button" aria-label="closeBtn">
                  <svg
                    onClick={closeBtn}
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
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </button>
                <div className="w-full border py-2 flex">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search..."
                    className="outline-none ml-4 w-full "
                  />
                  <button
                    type="button"
                    aria-label="search"
                    onClick={() => {
                      searchBook(search);
                      setShow(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="mr-4 w-6 h-6"
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

              <div className={`${show ? '' : 'hidden'}`}>
                {/* <SearchUI data={data} loading={loading} error={error} isDark={isDark} /> */}
                <BooksList books={books} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
