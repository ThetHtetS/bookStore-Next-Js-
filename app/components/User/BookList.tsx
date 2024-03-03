import Link from 'next/link';
import React from 'react';
import Book from '@/lib/redux/slices/bookSlice/book';
import Cart from '@/lib/redux/slices/cartSlice/cart';

export default function BooksList(props: {
  books: Book[];
  addToCart: (book: object) => void;
  cart: Cart[];
}) {
  const { books, addToCart } = props;
  let id = 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 mx-auto gap-3 md:gap-12 pl-12">
      {!!books.length &&
        books.map((item) => (
          //da = !!cart && cart.some((it) => it.book === item._id);
          //  console.log(da);

          // var cat= categories.filter(cat=> cat._id== item.category)
          <div className=" bg-white h-auto group mb-12 mt-4 md:w-auto w-32">
            <Link href={`/${item._id}`}>
              <img
                alt="book cover"
                src={`http://localhost:4000/images/books/${item.photo}`}
                className="md:w-56 w-28"
              />
              <div className="mt-3 font-bold text-lg">{item.title}</div>
              <div className="font-bold italic">
                by
                {` ${item.author}`}
              </div>
              <div>
                {item.price}
                <span className="text-bold"> MMK</span>
              </div>
              <div className="">
                {item.stock === 0 ? 'No Stock' : 'In Stock'}
              </div>
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
  );
}
