'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Link from 'next/link';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginAsync, useDispatch } from '@/lib/redux';

export default function Login() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirectUrl');
  const router = useRouter();
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);

  const login = (user: any, setSubmitting, resetForm) => {
    setSubmitting(true);
    dispatch(loginAsync(user))
      .unwrap()
      .then(
        (res) => {
          if (redirectUrl) {
            router.push(redirectUrl);
          } else {
            router.push('/');
          }
        },
        (err) => {
          MySwal.fire(err.message);
          resetForm();
        },
      );
  };

  return (
    <div className="grid place-items-center pt-12">
      <div className="md:w-2/6">
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            login(values, setSubmitting, resetForm);
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
                  disabled={isSubmitting}
                >
                  Sign In
                </button>
                <Link href="/account/forgetPassword">
                  <button
                    className="border bg-black text-white rounded-sm px-3 py-1"
                    type="button"
                  >
                    forgot password
                  </button>
                </Link>
                <Link href="/account/register">
                  <p className="mt-3">Create account</p>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
