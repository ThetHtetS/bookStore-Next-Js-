'use client';

import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import NewOrUpdateBooks from '@/app/components/admin/NewOrUpdateBooks';
import BooksList from '@/app/components/admin/bookList';
import {
  selectBooks,
  useSelector,
  getCategoryById,
  selectCategories,
  useDispatch,
  bookSlice,
  getLength,
} from '@/lib/redux';
import Book from '@/lib/redux/slices/bookSlice/book';
import {
  addBook,
  deleteBook,
  loadAllBook,
  updateBook,
} from '@/lib/redux/slices/bookSlice/thunks';
import Category from '@/lib/redux/slices/categorySlice/category';
import { loadAllCategory } from '@/lib/redux/slices/categorySlice/thunks';

export default function IndexPage() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const books: Book[] = useSelector(selectBooks);

  const [bookToEdit, setBookToEdit] = useState(null);
  const categories: Category[] = useSelector(selectCategories);
  const [data, setData] = useState(); //no slice for this data
  const MySwal = withReactContent(Swal);
  //set default page number and number of document
  let [pagin, setPagin] = useState({
    page: 1,
    limit: 4,
  });

  //Fetch Api data
  useEffect(() => {
    dispatch(loadAllBook(pagin))
      .unwrap()
      .then((res) => {
        setData(res.data.total);
      });
    dispatch(loadAllCategory());
  }, [pagin]);

  let totalPage = (!!data && Math.floor((data * 1) / pagin.limit) + 1) || 1;

  //edit handler
  const btnEditHandler = (book: Book) => {
    setBookToEdit(book);
  };

  //create book or update
  const saveOrUpdateBook = (book: Book) => {
    if (bookToEdit) {
      const data = { ...book, _id: bookToEdit._id };
      dispatch(updateBook(data))
        .unwrap()
        .then(
          (res) => {
            //  MySwal.fire(res.message);
          },
          (err) => {
            MySwal.fire(err.message);
          },
        );
      setBookToEdit(null);
    } else {
      dispatch(addBook(book))
        .unwrap()
        .then(
          (res) => {
            // MySwal.fire(res.message);
          },
          (err) => {
            MySwal.fire(err.message);
          },
        );
    }
  };

  const deleteHandler = (data) => {
    dispatch(deleteBook(data))
      .unwrap()
      .then(
        (res) => {
          //MySwal.fire(res.message);
        },
        (err) => {
          MySwal.fire(err.message);
        },
      );
  };

  const next = () => {
    totalPage !== pagin.page && setPagin({ page: pagin.page + 1, limit: 4 });
  };
  const previous = () => {
    pagin.page !== 1 && setPagin({ page: pagin.page - 1, limit: 4 });
  };

  return (
    <div className="pt-3 pb-3 px-16 md:px-8 h-screen -pb-20 ">
      <div className="lg:absolute lg:right-10 lg:top-20  ">
        <div
          onClick={() => {
            setOpen(!open);
          }}
          type="button"
          className="bg-green-500 text-white text-lg ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium  "
        >
          Create+
        </div>
      </div>
      {!books.length && (
        <div className="h-80 flex items-center justify-center font-bold">
          No book found!!
        </div>
      )}
      <BooksList
        btnEditHandler={btnEditHandler}
        deleteHandler={deleteHandler}
        open={open}
        setOpen={setOpen}
        books={books}
      />

      {!!books.length && (
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

      {categories.length && (
        <NewOrUpdateBooks
          open={open}
          setOpen={setOpen}
          categories={categories}
          bookToEdit={bookToEdit}
          setBookToEdit={setBookToEdit}
          saveOrUpdateBook={saveOrUpdateBook}
        />
      )}
    </div>
  );
}
