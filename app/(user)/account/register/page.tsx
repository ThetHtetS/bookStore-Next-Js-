'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import { RegisterAsync, useDispatch } from '@/lib/redux';

export default function Register() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirectUrl');
  const router = useRouter();
  const dispatch = useDispatch();
  const register = (user: any) => {
    dispatch(RegisterAsync(user))
      .unwrap()
      .then(
        (response) => {
          alert('Your Account has been registered Successfully');
          if (redirectUrl) {
            router.push(redirectUrl);
          } else {
            router.push('/');
          }
        },
        (err) => {
          // console.log('Error case ', err);
          // MySwal.fire('Invalid username or password');
          //  resetForm();
        },
      );
  };
  return (
    <div className="px-80 pt-12">
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          passwordConfirm: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          register(values);
        }}
        // validate={(values) => {
        //   const errors = {};

        //   if (!values.email) {
        //     errors.email = 'Required';
        //   } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //   ) {
        //     errors.email = 'Invalid email address';
        //   }

        //   return errors;
        // }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-8">
            <div className="text-center mb-5">
              <span className="text-3xl">Create account</span>
            </div>

            <div className="mb-5">
              <Field
                placeholder="enter your name"
                type="text"
                name="name"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20
                          text-gray-900 ring-1 placeholder:text-gray-400
                              sm:text-sm sm:leading-6"
              />

              <ErrorMessage name="name" component="div" />
            </div>
            <div className="mb-5">
              <Field
                placeholder="enter your email"
                type="email"
                name="email"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20
                          text-gray-900 ring-1 placeholder:text-gray-400
                              sm:text-sm sm:leading-6"
              />

              <ErrorMessage name="email" component="div" />
            </div>
            <div className="mb-5">
              <Field
                placeholder="enter your password"
                type="password"
                name="password"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20
                          text-gray-900 ring-1 placeholder:text-gray-400
                          sm:text-sm sm:leading-6"
              />

              <ErrorMessage name="password" component="div" />
            </div>

            <div className="mb-5">
              <Field
                placeholder="enter your password"
                type="password"
                name="passwordConfirm"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20
                          text-gray-900 ring-1 placeholder:text-gray-400
                          sm:text-sm sm:leading-6"
              />

              <ErrorMessage name="passwordConfirm" component="div" />
            </div>

            <div className="text-center">
              <button
                className="border bg-black text-white rounded-sm px-3 py-1"
                type="submit"
                // disabled={isSubmitting}
              >
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
