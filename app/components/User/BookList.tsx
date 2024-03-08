import Link from 'next/link';
import React, { useRef } from 'react';
//import { MdChevronLeft, MdChevronRight } from 'react-icons';

import Book from '@/lib/redux/slices/bookSlice/book';
import Cart from '@/lib/redux/slices/cartSlice/cart';

export default function BooksList(props: {
  books: Book[];
  addToCart: (book: object) => void;
  cart: Cart[];
}) {
  const container = useRef();
  const { books, addToCart } = props;
  let id = 0;
  const slideLeft = () => {
    container.current.scrollLeft -= 300;
  };

  const slideRight = () => {
    container.current.scrollLeft += 300;
  };

  return (
    <div className="flex items-center gap-3 px-12 py-3">
      <button
        aria-label="slideLeft"
        type="submit"
        className="opacity-50 cursor-pointer hover:opacity-100 text-2xl"
        onClick={slideLeft}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <div
        ref={container}
        id="container"
        className="flex gap-10 overflow-x-scroll scroll whitespace-nowrap scroll-smooth no-scrollbar"
      >
        {books.map((item) => (
          <div className="min-w-[200px] group ">
            <Link href={`/${item._id}`}>
              <img
                className="  p-2 cursor-pointer"
                alt="book cover"
                src={`http://localhost:4000/images/books/${item.photo}`}
              />
              <div className="mt-3 font-bold text-lg">{item.title}</div>
              <div className="font-bold italic">
                by
                {` ${item.author}`}
              </div>
              <div>
                <span
                  className={`${item.discountPrice ? 'line-through' : ''} `}
                >
                  {item.price}
                </span>
                <span> {!!item.discountPrice && item.discountPrice}</span>
                <span className="text-bold"> MMK</span>
              </div>
              <div className="">{item.stock === 0 ? 'No Stock' : ''}</div>
              {/* <div className="flex justify-between">
                {/* {cat.map(c=>(<div>{c.name}</div>))}   */}
              {/* {item.category.name} */}
              {/* </div> */}
            </Link>

            <button
              type="button"
              onClick={() => {
                addToCart({
                  _id: id++,
                  book: item._id,
                  title: item.title,
                  qty: 1,
                  price: item.price,
                });
              }}
              className="border bg-yellow-200 mt-2 rounded px-1 py-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <button
        type="submit"
        aria-label="slideRight"
        className="opacity-50 cursor-pointer hover:opacity-100 text-2xl"
        onClick={slideRight}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}
