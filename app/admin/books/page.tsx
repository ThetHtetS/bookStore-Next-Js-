'use client';

import React, { useEffect, useState } from 'react';
import NewOrUpdateBooks from '@/app/components/admin/NewOrUpdateBooks';
import BooksList from '@/app/components/admin/bookList';
import {
  selectBooks,
  useSelector,
  getCategoryById,
  selectCategories,
  useDispatch,
  bookSlice,
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
  let [pagin, setPagin] = useState({
    page: 1,
    limit: 4,
  });

  useEffect(() => {
    dispatch(loadAllBook(pagin))
      .unwrap()
      .then((data) => console.log('Response from thunk ', data));
    dispatch(loadAllCategory());
  }, [pagin]);

  const btnEditHandler = (book: Book) => {
    setBookToEdit(book);
  };
  const saveOrUpdateBook = (book: Book) => {
    if (bookToEdit) {
      // let category= book.category;
      const data = { ...book, _id: bookToEdit._id };
      dispatch(updateBook(data));
      setBookToEdit(null);
    } else {
      //  let data={...book}
      dispatch(addBook(book));
    }
  };

  const deleteHandler = (data) => {
    dispatch(deleteBook(data));
  };

  const next = () => {
    setPagin({ page: pagin.page + 1, limit: 4 });
  };
  const previous = () => {
    setPagin({ page: pagin.page - 1, limit: 4 });
  };

  return (
    <div className="pt-3 pb-3 px-16 md:px-8 h-screen ">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between  ">
          <div
            onClick={previous}
            className={`relative inline-flex items-center rounded-md border border-gray-300  px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 `}
          >
            Previous
          </div>
          <div
            onClick={next}
            className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium  `}
          >
            Next
          </div>
        </div>
      </div>
      <BooksList
        btnEditHandler={btnEditHandler}
        deleteHandler={deleteHandler}
        open={open}
        setOpen={setOpen}
        books={books}
      />
      <NewOrUpdateBooks
        open={open}
        setOpen={setOpen}
        categories={categories}
        bookToEdit={bookToEdit}
        setBookToEdit={setBookToEdit}
        saveOrUpdateBook={saveOrUpdateBook}
      />
    </div>
  );
}
