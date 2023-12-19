"use client"
 import React from 'react'
 import { Formik, Form, Field, ErrorMessage } from 'formik';

 export default function Register() {
   return (
     <div className='px-80 pt-12'>
        <Formik

            initialValues={{ email: '', password: '' }}

            validate={values => {

              const errors = {};

              if (!values.email) {

                errors.email = 'Required';

              } else if (

                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)

              ) {

                errors.email = 'Invalid email address';

              }

              return errors;

            }}

            onSubmit={(values, { setSubmitting }) => {

              setTimeout(() => {

                alert(JSON.stringify(values, null, 2));

                setSubmitting(false);

              }, 400);

            }}

            >

            {({ isSubmitting }) => (

          <Form className='space-y-8'>
           <div className="text-center mb-5">
              <span className='text-3xl'>Create account</span>
           </div>
           <div className="mb-5">
           <Field 
                placeholder="enter your email"
                type="email"
                name="email" 
                className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20
                          text-gray-900 ring-1 placeholder:text-gray-400 
                              sm:text-sm sm:leading-6'/>

            <ErrorMessage name="email" component="div" />
           </div>

           <div className="mb-5">
           <Field 
                placeholder="enter your password"
                type="password"
                name="password" 
                className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20
                          text-gray-900 ring-1 placeholder:text-gray-400 
                          sm:text-sm sm:leading-6'
            />      

            <ErrorMessage name="password" component="div" />

           </div>
           
          <div className="text-center">
          <button className='border bg-black text-white rounded-sm px-3 py-1' type="submit" disabled={isSubmitting}>

            Create

          </button>
   
          </div>

          </Form>

        )}

        </Formik>

     </div>
   )
 }
  
  
  
  
  
  
  
      