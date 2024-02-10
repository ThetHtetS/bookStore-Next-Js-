import React from 'react';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Book from '@/lib/redux/slices/bookSlice/book';
import Image from 'next/image';

export default function BooksList(props: {
  books: Book[];
  open: boolean;
  setOpen: (open: boolean) => void;
  deleteHandler: (item: Book) => void;
  btnEditHandler: () => void;
}) {
  const { books, setOpen, open, deleteHandler, btnEditHandler } = props;
  const MySwal = withReactContent(Swal);
  return (
    <div className="pt-32 grid grid-cols-2  lg:grid-cols-4 mx-auto gap-16">
      {books.map((item) => (
        // var cat= categories.filter(cat=> cat._id== item.category)
        <div className="bg-white h-48 group mb-28 w-28 md:w-auto">
          <img
            alt="book cover"
            // src="https://cdn.myanmarseo.com/file/client-cdn/novelbookcentre/wp-content/uploads/2024/01/w6.png"
            src={`http://localhost:4000/images/books/${item.photo}`}
            className="w-40 "
          />
          <div className="mt-3">{item.title}</div>
          <div>
            {item.price}
            <span className="text-bold">MMK</span>
          </div>
          <div className=""> {item.qty} stock</div>
          <div className="flex justify-between">
            {item.category.name}
            {/* {cat.map(c=>(<div>{c.name}
            </div>))}   */}
            <div className="hidden group-hover:flex gap-2 items-center">
              {/* edit button */}
              <button
                type="button"
                aria-label="edit"
                onClick={(e) => {
                  btnEditHandler(item);
                  setOpen(true);
                }}
              >
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
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
              {/* delete button */}
              <button
                type="button"
                aria-label="delete"
                onClick={() => {
                  MySwal.fire({
                    title: 'Are you sure you want to delete this book',
                    text: 'Delete book',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteHandler({ _id: item._id });
                    }
                  });
                }}
              >
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
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
