'use client';

import React from 'react';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import { RegisterAsync, useDispatch } from '@/lib/redux';

export default function Register() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirectUrl');
  const router = useRouter();
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);

  //Validation input
  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Name is Required'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string()
      .required(' Please enter your password!')
      .min(8, 'Password must be at least 8 characters'),
    passwordConfirm: Yup.string().required(
      'Please enter your password confirm',
    ),
  });

  //make a API request
  const register = (user: any, setSubmitting, resetForm) => {
    setSubmitting(true);
    dispatch(RegisterAsync(user))
      .unwrap()
      .then(
        () => {
          MySwal.fire(
            'Congratulations! Your account has been successfully registered',
          );
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
    <div className="grid place-items-center -mt-6 md:-ml-6">
      <div className="md:w-2/6 pt-12">
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            register(values, setSubmitting, resetForm);
          }}
          validationSchema={registerSchema}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-8">
              <div className="text-center mb-5">
                <span className="text-3xl">Create account</span>
              </div>

              <div className="mb-2 space-y-1">
                <Field
                  placeholder="Enter your name"
                  type="text"
                  name="name"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20
                          text-gray-900 ring-1 placeholder:text-gray-400
                              sm:text-sm sm:leading-6"
                />
                <ErrorMessage
                  name="name"
                  className="absolute mx-6  text-red-500"
                  component="div"
                />
              </div>
              <div className="mb-2 space-y-1">
                <Field
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20
                          text-gray-900 ring-1 placeholder:text-gray-400
                              sm:text-sm sm:leading-6"
                />

                <ErrorMessage
                  name="email"
                  className="absolute mx-6  text-red-500"
                  component="div"
                />
              </div>
              <div className="space-y-1">
                <Field
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20
                          text-gray-900 ring-1 placeholder:text-gray-400
                          sm:text-sm sm:leading-6"
                />

                <ErrorMessage
                  name="password"
                  className="absolute mx-6  text-red-500"
                  component="div"
                />
              </div>

              <div className="space-y-1">
                <Field
                  placeholder="Enter your password"
                  type="password"
                  name="passwordConfirm"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20
                          text-gray-900 ring-1 placeholder:text-gray-400
                          sm:text-sm sm:leading-6"
                />

                <ErrorMessage
                  name="passwordConfirm"
                  className="absolute mx-6  text-red-500"
                  component="div"
                />
              </div>

              <div>
                <button
                  className="w-full border bg-green-500 text-white rounded-lg px-3 py-1"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Create
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
