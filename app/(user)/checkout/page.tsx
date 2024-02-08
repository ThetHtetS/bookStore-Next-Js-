'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  cartSlice,
  selectBooks,
  selectCarts,
  useDispatch,
  useSelector,
} from '@/lib/redux';
import { addNewOrder } from '@/lib/redux/slices/orderSlice/thunks';
import Order from '@/lib/redux/slices/orderSlice/order';

export default function Page() {
  const cart = useSelector(selectCarts);
  const books = useSelector(selectBooks);
  const router = useRouter();
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(false);
  let subtotal = 0;

  const orde = cart.map((item) => ({ book: item.book, qty: item.qty }));

  const createOrder = (data: Order) => {
    setLoading(true);
    const uid = localStorage.getItem('Uid');
    const order = {
      ...data,
      uid,
      orderItem: orde,
    };
    dispatch(addNewOrder(order))
      .unwrap()
      .then((res) => {
        setLoading(false);
        if (res.status === 'success') {
          router.push('/account');
        }
      });
    dispatch(cartSlice.actions.deleteAllCart());
  };

  if (!cart.length) {
    router.push('/');
  }

  return (
    <div className="md:flex gap-1 text-center">
      {loading && <div className="font-bold text-center"> Processing... </div>}
      {!loading && (
        <>
          <div className="h-screen md:w-3/5  px-20 pt-10 border-r">
            <Formik
              initialValues={{ phone: '', name: '', address: '' }}
              validate={(values) => {
                const errors = {};

                if (!values.phone) {
                  errors.phone = 'Required';
                }
                if (!values.name) {
                  errors.name = 'Required';
                }
                if (!values.address) {
                  errors.address = 'Required';
                }

                return errors;
              }}
              onSubmit={(values) => {
                const data = { ...values };
                createOrder(data);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-8">
                  <div className="space-y-2">
                    <div className="font-bold text-2xl">Contact</div>
                    <Field
                      placeholder="Email or Phone Nunmber"
                      type="text"
                      name="phone"
                      className="block w-full rounded-md border border-black py-1.5 pl-7 pr-20
                   text-gray-900  placeholder:text-gray-400 "
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="font-bold text-2xl">Delivery</div>
                    <Field
                      placeholder="Name"
                      type="text"
                      name="name"
                      className="block w-full rounded-md border border-black py-1.5 pl-7 pr-20
                          text-gray-900  placeholder:text-gray-400 "
                    />
                    <ErrorMessage name="name" component="div" />
                  </div>
                  <div className="space-y-2">
                    <Field
                      placeholder="Address"
                      type="text"
                      name="address"
                      className="block w-full rounded-md border border-black py-1.5 pl-7 pr-20
                       text-gray-900 placeholder:text-gray-400 "
                    />
                    <ErrorMessage name="address" component="div" />
                  </div>
                  <button
                    className="bg-black text-white rounded-2xl w-full px-2 py-1"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <div className=" md:w-2/5  pt-20 px-20 ">
            {cart.map((item) => {
              const book = books.filter((ele) => ele._id === item.book);
              subtotal += book[0].price * item.qty;

              return (
                <div className="flex justify-between w-full bg-white py-5 px-3  border-t">
                  <div className=" flex gap-1">
                    <div>{book[0].title}</div>
                    <div className=" bg-slate-200 rounded-full px-2">
                      {item.qty}
                    </div>
                  </div>
                  <div className=" ">{item.qty * book[0].price}</div>
                </div>
              );
            })}

            <div className="flex justify-between w-full bg-white pt-3 px-3 border-t">
              <div className="">Subtotal:</div>
              <div className="">{subtotal}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
