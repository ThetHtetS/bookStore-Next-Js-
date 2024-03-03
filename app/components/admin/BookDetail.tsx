import React, { useState } from 'react';
import Image from 'next/image';
import Book from '@/lib/redux/slices/bookSlice/book';
import Category from '@/lib/redux/slices/categorySlice/category';
import DoneIcon from '../../icon/done.svg';

export default function BookDetail(props: {
  book: Book[];
  categories: Category[];
  updateBook: (x: object) => void;
  isEditing: boolean;
  setIsEditing: (x: boolean) => void;
}) {
  const { book, categories, updateBook, isEditing, setIsEditing } = props;
  const [current, setCurrent] = useState(); //select current input tag
  const [edit, setEdit] = useState(); //container for currently edit input value

  const handleChange = (e) => {
    setEdit({ [e.target.name]: e.target.value });
  };

  const handleDoubleClick = (name: string, data: object) => {
    setIsEditing(true);
    setCurrent(name);
    setEdit(data);
  };

  const handleSubmit = () => {
    updateBook({ ...edit, _id: book[0]._id });
  };
  return (
    <div>
      {!!book.length && (
        <div className="flex gap-4 pl-20 pt-12">
          <div className="text-center w-auto">
            <img
              alt="book cover"
              src={`http://localhost:4000/images/books/${book[0].photo}`}
              className="w-80"
            />
          </div>

          <div className=" pl-8 space-y-4 max-w-[650px]">
            <div
              className="my-3 space-y-1"
              onDoubleClick={() =>
                handleDoubleClick('title', { title: book[0].title })
              }
            >
              {isEditing && current === 'title' ? (
                <div className="flex items-center gap-2">
                  <input
                    placeholder="Enter New Category"
                    type="text"
                    name="title"
                    value={edit.title}
                    className="block w-full rounded-md border-0 py-1.5 pl-7
                                               text-gray-900 ring-1 placeholder:text-gray-400
                                                   sm:text-sm sm:leading-6"
                    onChange={(e) => handleChange(e)}
                  />
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className=" rounded-lg p-1"
                  >
                    <Image
                      src={DoneIcon}
                      width={40}
                      height={40}
                      alt="DoneIcon"
                    />
                  </button>
                </div>
              ) : (
                <h1 className=" text-2xl font-bold">{book[0].title}</h1>
              )}
            </div>

            <div
              className="my-3 space-y-1"
              onDoubleClick={() =>
                handleDoubleClick('author', { author: book[0].author })
              }
            >
              {isEditing && current === 'author' ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    name="author"
                    value={edit.author}
                    className="block w-full rounded-md border-0 py-1.5 pl-7
                                               text-gray-900 ring-1 placeholder:text-gray-400
                                                   sm:text-sm sm:leading-6"
                    onChange={(e) => handleChange(e)}
                  />
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className=" rounded-lg p-1"
                  >
                    <Image
                      src={DoneIcon}
                      width={40}
                      height={40}
                      alt="DoneIcon"
                    />
                  </button>
                </div>
              ) : (
                <div className=" ">{`Author -  ${book[0].author}`}</div>
              )}
            </div>

            <div
              className="my-3 space-y-1"
              onDoubleClick={() =>
                handleDoubleClick('category', {
                  category: book[0].category._id,
                })
              }
            >
              {isEditing && current === 'category' ? (
                <div className="flex items-center gap-2">
                  <select
                    name="category"
                    onChange={(e) => handleChange(e)}
                    value={edit.category}
                    className="block w-full rounded-md border-0 py-1.5 pl-7
                                               text-gray-900 ring-1 placeholder:text-gray-400
                                                   sm:text-sm sm:leading-6"
                  >
                    {categories.map((item) => (
                      <option value={item._id}>{item.name}</option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className=" rounded-lg p-1"
                  >
                    <Image
                      src={DoneIcon}
                      width={40}
                      height={40}
                      alt="DoneIcon"
                    />
                  </button>
                </div>
              ) : (
                <div className="text-blue-500 ">{book[0].category.name}</div>
              )}
            </div>

            <div
              className="my-3 space-y-1"
              onDoubleClick={() =>
                handleDoubleClick('price', { price: book[0].price })
              }
            >
              {isEditing && current === 'price' ? (
                <div className="flex items-center gap-2">
                  <input
                    placeholder="Enter New Category"
                    type="text"
                    name="price"
                    value={edit.price}
                    className="block w-full rounded-md border-0 py-1.5 pl-7
                                               text-gray-900 ring-1 placeholder:text-gray-400
                                                   sm:text-sm sm:leading-6"
                    onChange={(e) => handleChange(e)}
                  />
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className=" rounded-lg p-1"
                  >
                    <Image
                      src={DoneIcon}
                      width={40}
                      height={40}
                      alt="DoneIcon"
                    />
                  </button>
                </div>
              ) : (
                <p className="">{`Selling Price - ${book[0].price}`}</p>
              )}
            </div>
            <div
              className="my-3 space-y-1"
              onDoubleClick={() =>
                handleDoubleClick('buyingPrice', {
                  buyingPrice: book[0].buyingPrice,
                })
              }
            >
              {isEditing && current === 'buyingPrice' ? (
                <div className="flex items-center gap-2">
                  <input
                    placeholder="Enter New Category"
                    type="text"
                    name="price"
                    value={edit.buyingPrice}
                    className="block w-full rounded-md border-0 py-1.5 pl-7
                                               text-gray-900 ring-1 placeholder:text-gray-400
                                                   sm:text-sm sm:leading-6"
                    onChange={(e) => handleChange(e)}
                  />
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className=" rounded-lg p-1"
                  >
                    <Image
                      src={DoneIcon}
                      width={40}
                      height={40}
                      alt="DoneIcon"
                    />
                  </button>
                </div>
              ) : (
                <p className="">{`Buying Price -  ${book[0].buyingPrice}`}</p>
              )}
            </div>
            <div
              className="my-3 space-y-1"
              onDoubleClick={() =>
                handleDoubleClick('stock', { stock: book[0].stock })
              }
            >
              {isEditing && current === 'stock' ? (
                <div className="flex items-center gap-2">
                  <input
                    placeholder="Enter New Category"
                    type="text"
                    name="stock"
                    value={edit.stock}
                    className="block w-full rounded-md border-0 py-1.5 pl-7
                                               text-gray-900 ring-1 placeholder:text-gray-400
                                                   sm:text-sm sm:leading-6"
                    onChange={(e) => handleChange(e)}
                  />
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className=" rounded-lg p-1"
                  >
                    <Image
                      src={DoneIcon}
                      width={40}
                      height={40}
                      alt="DoneIcon"
                    />
                  </button>
                </div>
              ) : (
                <p className="">{`Stock - ${book[0].stock}`}</p>
              )}
            </div>

            {book[0].discountPrice || isEditing ? (
              <div
                className="my-3 space-y-1"
                onDoubleClick={() =>
                  handleDoubleClick('discountPrice', {
                    discountPrice: book[0].discountPrice,
                  })
                }
              >
                {isEditing && current === 'discountPrice' ? (
                  <div className="flex items-center gap-2">
                    <input
                      placeholder="Enter Discount Price"
                      type="text"
                      name="discountPrice"
                      value={edit.discountPrice}
                      className="block w-full rounded-md border-0 py-1.5 pl-7
                                               text-gray-900 ring-1 placeholder:text-gray-400
                                                   sm:text-sm sm:leading-6"
                      onChange={(e) => handleChange(e)}
                    />
                    <button
                      type="button"
                      onClick={() => handleSubmit()}
                      className=" rounded-lg p-1"
                    >
                      <Image
                        src={DoneIcon}
                        width={40}
                        height={40}
                        alt="DoneIcon"
                      />
                    </button>
                  </div>
                ) : (
                  <p className="">{book[0].discountPrice}</p>
                )}
              </div>
            ) : (
              <button
                type="submit"
                onClick={() => {
                  handleDoubleClick('discountPrice', {
                    discountPrice: '',
                  });
                }}
                className="bg-blue-500 p-1 rounded-lg text-white"
              >
                Set Discount Price
              </button>
            )}
            {book[0].description || isEditing ? (
              <div
                className="my-3 space-y-1"
                onDoubleClick={() =>
                  handleDoubleClick('description', {
                    description: book[0].description,
                  })
                }
              >
                {isEditing && current === 'description' ? (
                  <div className="flex items-center gap-2">
                    <textarea
                      rows="10"
                      cols="60"
                      placeholder="Enter Description"
                      type="text"
                      name="description"
                      value={edit.description}
                      className="block w-full rounded-md border-0 py-1.5 pl-7
                                               text-gray-900 ring-1 placeholder:text-gray-400
                                                   sm:text-sm sm:leading-6"
                      onChange={(e) => handleChange(e)}
                    />
                    <button
                      type="button"
                      onClick={() => handleSubmit()}
                      className=" rounded-lg p-1"
                    >
                      <Image
                        src={DoneIcon}
                        width={40}
                        height={40}
                        alt="DoneIcon"
                      />
                    </button>
                  </div>
                ) : (
                  <p className="bg-slate-50">{book[0].description}</p>
                )}
              </div>
            ) : (
              <button
                type="submit"
                onClick={() => {
                  handleDoubleClick('description', {
                    description: '',
                  });
                }}
                className="bg-blue-500 p-1 rounded-lg text-white ml-3"
              >
                Set Description
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
