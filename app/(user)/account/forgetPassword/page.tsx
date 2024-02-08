'use client';

import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { forgetPasswordAsync, useDispatch } from '@/lib/redux';

export default function forgetPassword() {
  const dispatch = useDispatch();
  let [done, setDone] = useState(false);
  let [message, setMessage] = useState();
  let [loading, setLoading] = useState(false);
  return (
    <div className="text-center mt-20">
      {!loading && !done && (
        <div>
          <div className="-ml-5">
            <h1 className="font-bold text-xl"> Forget your password?</h1>
            <p className="py-6">
              Please Enter your email address.
              <br />
              You will receive a link
              <br />
              to create a new password
              <br />
              via email
            </p>
          </div>
          <div className=" grid place-items-center ml-6">
            <Formik
              initialValues={{
                email: '',
              }}
              onSubmit={(values: any) => {
                setLoading(true);
                dispatch(forgetPasswordAsync(values))
                  .unwrap()
                  .then((res) => {
                    if (res.status === 'success') {
                      setDone(true);
                      setMessage(res.message);
                    }
                    setLoading(false);
                  });
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="flex items-center gap-1">
                    <Field
                      name="email"
                      placeholder="Please Enter your email"
                      type="email"
                      className="block w-80 rounded-md border-0 py-1.5 pl-7 pr-20
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
      {loading && <div className="pt-3 font-bold"> just a sec... </div>}
      {done && (
        <div className="pt-6 text-green-500">
          {message}
          <br />
          Please Check your email!!!
        </div>
      )}
    </div>
  );
}
