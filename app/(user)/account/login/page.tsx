'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { forgetPasswordAsync, loginAsync, useDispatch } from '@/lib/redux';

// import { Router } from 'next/router';

export default function Login() {
  const token = window.localStorage.getItem('token');
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirectUrl');
  const router = useRouter();
  const dispatch = useDispatch();

  if (token) {
    router.push('/account');
  }

  const login = (user: any) => {
    dispatch(loginAsync(user))
      .unwrap()
      .then(
        (response) => {
          if (redirectUrl) {
            router.push(redirectUrl);
          } else {
            router.push('/');
          }
        },
        (err) => {
          // console.log('Error case ', err);
          alert(err.message);
          // MySwal.fire('Invalid username or password');
          // resetForm();
        },
      );
  };

  const forgetPassword = () => {
    dispatch(forgetPasswordAsync('thethtetsoe114@gmail.com'))
      .unwrap()
      .then(
        (response) => {
          if (redirectUrl) {
            router.push(redirectUrl);
          } else {
            router.push('/');
          }
        },
        (err) => {
          // console.log('Error case ', err);
          alert(err.message);
          // MySwal.fire('Invalid username or password');
          // resetForm();
        },
      );
  };

  return (
    <div className="md:px-80 pt-12">
      <Formik
        initialValues={{ email: '', password: '' }}
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
        onSubmit={(values, { setSubmitting }) => {
          login(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-8">
            <div className="text-center mb-5">
              <span className="text-3xl">Login</span>
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

            <div className="text-center">
              <button
                className="border bg-black text-white rounded-sm px-3 py-1"
                type="submit"
              >
                Sign In
              </button>
              <button
                className="border bg-black text-white rounded-sm px-3 py-1"
                type="button"
                onClick={() => forgetPassword()}
              >
                forgot password
              </button>
              <Link href="/account/register">
                <p className="mt-3">Create account</p>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
