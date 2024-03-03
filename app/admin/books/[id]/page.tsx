'use client';

//import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import {
  selectBooks,
  selectCategories,
  useDispatch,
  useSelector,
} from '@/lib/redux';
import { getBook, updateBook } from '@/lib/redux/slices/bookSlice/thunks';
import BookDetail from '@/app/components/admin/BookDetail';
import { loadAllCategory } from '@/lib/redux/slices/categorySlice/thunks';

export default function Indexpage({ params }: { params: { id: number } }) {
  const dispatch = useDispatch();
  const book = useSelector(selectBooks);
  const categories: Category[] = useSelector(selectCategories);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const MySwal = withReactContent(Swal);
  useEffect(() => {
    const data = { _id: params.id };
    dispatch(getBook(data))
      .unwrap()
      .then(() => {
        setLoading(false);
      });
    dispatch(loadAllCategory());
  }, []);

  const updateBookHandle = (book) => {
    dispatch(updateBook(book))
      .unwrap()
      .then(
        (res) => {
          setIsEditing(false);
          //  MySwal.fire(res.message);
        },
        (err) => {
          MySwal.fire(err.message);
        },
      );
  };
  return (
    <div>
      {!loading && (
        <BookDetail
          book={book}
          updateBook={updateBookHandle}
          categories={categories}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
}
