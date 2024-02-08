import Link from 'next/link';
import React from 'react';
import Book from '@/lib/redux/slices/bookSlice/book';

export default function BooksList(props: {
  books: Book[];
  addToCart: (book: object) => void;
}) {
  let id = 0;
  const { books, addToCart } = props;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 mx-auto gap-3 md:gap-12 pl-12">
      {!!books.length &&
        books.map((item) => (
          // var cat= categories.filter(cat=> cat._id== item.category)
          <div className=" bg-white h-auto group mb-12 mt-4 md:w-auto w-32">
            <Link href={`/${item._id}`}>
              <img
                alt="book cover"
                src="https://novelbookstore.co/cdn/shop/files/NovelBookstore-461.jpg?v=1706426788&width=932"
                className="md:w-56 w-28"
              />
              <div className="mt-3">{item.title}</div>
              <div>
                {item.price}
                <span className="text-bold">MMK</span>
              </div>
              <div className="">{item.qty === 0 ? 'No Stock' : 'In Stock'}</div>
              <div className="flex justify-between">
                {/* {cat.map(c=>(<div>{c.name}</div>))}   */}
                {item.category.name}
              </div>
            </Link>
            <button
              type="button"
              onClick={() => addToCart({ _id: id++, book: item._id, qty: 1 })}
              className="border rounded px-1 py-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
    </div>
  );
}
