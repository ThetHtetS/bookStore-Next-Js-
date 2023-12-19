"use client"
import { Dialog, Transition } from '@headlessui/react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react'
import { Fragment, useRef } from 'react'




export default function EditOrSaveCategory({open,setOpen,categoryToEdit, 
  setCategoryToEdit, saveOrUpdateCategory}) {
 
    const cancelButtonRef = useRef(null)
  
    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
  
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                         {categoryToEdit? 'Edit Category': 'Add Category'} 
                        </Dialog.Title>   
                          <Formik
  
                           initialValues={{ name: categoryToEdit?categoryToEdit.name:'' }}
  
                                //  validate={values => {
                          
                                //    const errors = {};
                          
                                //    if (!values.email) {
                          
                                //      errors.email = 'Required';
                          
                                //    } else if (
                          
                                //      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                          
                                //    ) {
                          
                                //      errors.email = 'Invalid email address';
                          
                                //    }
                          
                                //    return errors;
                          
                                //  }}
  
                                onSubmit={(values)=>{
                                  let data= {
                                    ...values,
                                  
                                  }
                                  saveOrUpdateCategory(data);
                                  setOpen(false);
                                  
                                }
                                }
                              >
  
                                    {({ isSubmitting }) => (
                              
                                      <Form>
                              
                                        <Field placeholder="Enter New Category" type="text" name="name" className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20
                                                      text-gray-900 ring-1 placeholder:text-gray-400 
                                                          sm:text-sm sm:leading-6' />
                              
                                        <ErrorMessage name="email" component="div" />
                                      
                                        <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                <button
                                                  type="submit" disabled={isSubmitting}
                                                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                >
                                                Save
                                                </button>
                                                <button
                                                  type="button"
                                                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                  onClick={() =>{ setOpen(false);
                                                                setCategoryToEdit(null)}}
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
    )
  }