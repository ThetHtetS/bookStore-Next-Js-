'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Field, Form, Formik } from 'formik';
import { resetPasswordAsync, useDispatch } from '@/lib/redux';

export default function ({ params }: { params: { token: String } }) {
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(false);
  const router = useRouter();

  const resetPassword = (values) => {
    setLoading(true);
    const data = { ...values, token: params.token };
    dispatch(resetPasswordAsync(data))
      .unwrap()
      .then((res) => {
        if (res.status === 'success') {
          router.push('/');
        }
        setLoading(false);
      });
  };

  return (
    <div className="text-center md:-ml-3 px-auto">
      {loading && <div className="font-bold"> just a sec... </div>}
      {!loading && (
        <div>
          <h1 className="font-bold text-xl">Password Reset</h1>
          <div className="px-56 pt-6">
            <Formik
              initialValues={{
                password: '',
                passwordConfirm: '',
              }}
              onSubmit={(values: any) => {
                resetPassword(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="space-y-6 w-full">
                    <Field
                      name="password"
                      placeholder="Password"
                      type="password"
                      className="block rounded-md border-0 py-1.5 pl-7 pr-20
                                                      text-gray-900 ring-1 placeholder:text-gray-400
                                                          sm:text-sm sm:leading-6"
                    />
                    <Field
                      name="passwordConfirm"
                      placeholder="PasswordConfirm"
                      type="password"
                      className="block  rounded-md border-0 py-1.5 pl-7 pr-20
                                                      text-gray-900 ring-1 placeholder:text-gray-400
                                                          sm:text-sm sm:leading-6"
                    />
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    >
                      Reset
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}
