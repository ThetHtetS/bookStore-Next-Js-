'use client';

import { Dialog, Transition } from '@headlessui/react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { Fragment, useRef } from 'react';

export default function EditOrSaveCategory({
  open,
  setOpen,
  categoryToEdit,
  setCategoryToEdit,
  saveOrUpdateCategory,
}) {
  //Validation input
  const categorySchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Category field is Required'),
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

        <div className="fixed inset-0  pb-56 w-screen overflow-y-auto">
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4  pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start md:px-16 ">
                    <div className="mt-3 text-center  sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {categoryToEdit ? 'Edit Category' : 'Add Category'}
                      </Dialog.Title>
                      <Formik
                        initialValues={{
                          name: categoryToEdit ? categoryToEdit.name : '',
                        }}
                        validationSchema={categorySchema}
                        onSubmit={(values) => {
                          saveOrUpdateCategory(values);
                          setOpen(false);
                        }}
                      >
                        {({ isSubmitting }) => (
                          <Form>
                            <div className="my-3 space-y-1">
                              <Field
                                placeholder="Enter New Category"
                                type="text"
                                name="name"
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20
                                                      text-gray-900 ring-1 placeholder:text-gray-400
                                                          sm:text-sm sm:leading-6"
                              />

                              <ErrorMessage
                                name="name"
                                className="absolute text-red-500"
                                component="div"
                              />
                            </div>
                            <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                              <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 sm:ml-3 sm:w-auto"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                onClick={() => {
                                  setOpen(false);
                                  setCategoryToEdit(null);
                                }}
                                ref={cancelButtonRef}
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
