'use client';

import { Dialog, Transition } from '@headlessui/react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { Fragment, useRef } from 'react';
import Category from '@/lib/redux/slices/categorySlice/category';
import Book from '@/lib/redux/slices/bookSlice/book';

export default function NewOrUpdateBooks(props: {
  categories: Category[];
  open: boolean;
  setOpen: (open: boolean) => void;
  bookToEdit: Book;
  setBookToEdit: () => void;
  saveOrUpdateBook: () => void;
}) {
  const {
    categories,
    open,
    setOpen,
    bookToEdit,
    setBookToEdit,
    saveOrUpdateBook,
  } = props;
  const bookSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Name is Required'),
    price: Yup.number().required('Price is required'),
    qty: Yup.number().required('Product quantity is necessary!'),
  });
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 pb-28 w-screen overflow-y-auto ">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className=" relative transform overflow-hidden rounded-lg  text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className=" sm:flex  md:px-16 sm:items-start">
                    <div className="mt-3  sm:ml-4 sm:mt-0 sm:text-left space-y-3">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900 mb-1"
                      >
                        {bookToEdit ? 'Edit Book' : 'Add New Book'}
                      </Dialog.Title>
                      <Formik
                        initialValues={{
                          photo: null,
                          title: bookToEdit ? bookToEdit.title : '',
                          category: bookToEdit
                            ? bookToEdit.category
                            : categories[0]._id,
                          price: bookToEdit ? bookToEdit.price : '',
                          qty: bookToEdit ? bookToEdit.qty : '',
                        }}
                        validationSchema={bookSchema}
                        onSubmit={(values) => {
                          console.log(values);

                          saveOrUpdateBook(values);
                          setOpen(false);
                        }}
                      >
                        {({ isSubmitting, setFieldValue }) => (
                          <Form className="space-y-8">
                            <input
                              id="file"
                              name="photo"
                              type="file"
                              onChange={(event) => {
                                setFieldValue(
                                  'photo',
                                  event.currentTarget.files[0],
                                );
                              }}
                            />
                            <div className="space-y-1">
                              <Field
                                placeholder="Enter Book Title"
                                type="text"
                                name="title"
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20
                                                      text-gray-900 ring-1 placeholder:text-gray-400
                                                          sm:text-sm sm:leading-6"
                              />

                              <ErrorMessage
                                name="title"
                                className="absolute mx-6  text-red-500"
                                component="div"
                              />
                            </div>

                            <div className="space-y-1">
                              <Field
                                placeholder="Enter Book Price"
                                type="text"
                                name="price"
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20
                                                      text-gray-900 ring-1 placeholder:text-gray-400
                                                          sm:text-sm sm:leading-6"
                              />
                              <ErrorMessage
                                name="price"
                                className="absolute mx-6  text-red-500"
                                component="div"
                              />
                            </div>
                            <div className="space-y-1">
                              <Field
                                placeholder="Enter Book Quantity"
                                type="text"
                                name="qty"
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20
                                                      text-gray-900 ring-1 placeholder:text-gray-400
                                                          sm:text-sm sm:leading-6"
                              />
                              <ErrorMessage
                                name="qty"
                                className="absolute mx-6  text-red-500"
                                component="div"
                              />
                            </div>
                            <Field
                              as="select"
                              name="category"
                              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20
                                                      text-gray-900 ring-1 placeholder:text-gray-400
                                                          sm:text-sm sm:leading-6"
                            >
                              {categories.map((item) => (
                                <option value={item._id}>{item.name}</option>
                              ))}
                            </Field>
                            <div className=" px-4 py-3 mt-2 sm:flex sm:flex-row-reverse sm:px-6">
                              <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                onClick={() => {
                                  setOpen(false);
                                  setBookToEdit(null);
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
