"use client"
import { deleteReviewAsync, getAllReviewByBookAsync, saveReviewAsync, selectBooks, selectReviews, useDispatch, useSelector } from '@/lib/redux'
import { getBookById } from '@/lib/redux/slices/bookSlice/thunks'
import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react'

export default function Indexpage({ params }: { params: { id: number } }) {
    let dispatch = useDispatch();
    let book = useSelector(selectBooks);
    console.log(book);
    let review = useSelector(selectReviews);
    console.log( "review", review);
    
    
    useEffect(()=>{
        let data = {_id: params.id}
        dispatch(getBookById(data)).unwrap()
        .then(data=> {
        })
        dispatch(getAllReviewByBookAsync(data))
      },[])

    let saveReview =(review)=>{
        let uid = localStorage.getItem("Uid"); 
        let data ={...review, uid: uid, book: params.id, rating: 5};
        dispatch(saveReviewAsync(data))
    }

    let deleteHandle= (review)=>{
       dispatch(deleteReviewAsync(review))
    }
  return (
    <div>
       <div className="flex gap-12 px-24 pt-4">
       <div className="text-center md:w-80">
       <img src='https://novelbookstore.co/cdn/shop/products/IMG_94153_900x.jpg?v=1651213560' className='w-40'/>
       </div>
        <div className=" px-24 space-y-4 pt-4">
            <h1 className=' text-2xl'>{book[0].title}</h1>
            <p className=''>{book[0].category.name}</p>
            <p>{book[0].price} MMK</p>
        </div>
       </div>
       <div className="border-t mt-12 pt-12 h-screen">
          <div className="px-24">
            
          <Formik  initialValues={{
                review: '',
                //rating: rating
            }}
                    //  validationSchema={ReviewSchema}
                     onSubmit={values => {
                         //console.log(values);
                        saveReview(values);

                     }}
            >
                {({ errors, touched }) => (
                    <Form>
                     <div className="flex items-center gap-1">
                           <Field name="review" placeholder="Write your experience" type="text" className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20
                                                      text-gray-900 ring-1 placeholder:text-gray-400 
                                                          sm:text-sm sm:leading-6'
                               /> 
                           <button
                                type="submit" 
                                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                            >
                            Save
                             </button>      
                     </div>
                       
                     <div>
                            {/* <Rating style={{ maxWidth: 100 }}
                                    value={rating}
                                    onChange={setRating}
                            /> */}
                        </div>  
                    </Form>
                )}


            </Formik>

          </div>
         {!!review.length && review.map((item)=>{
            return(
                <div className="mt-8 px-24">
                    <div className="flex gap-1">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                        </span>
                        <span>
                                {item.uid.username}
                        </span>
                        
                    </div>
                     <div className="ml-8 bg-slate-50 w-30">
                       <div className="flex items-center gap-3">
                       
                      { item.uid._id == localStorage.getItem("Uid") &&
                          <button onClick={()=>deleteHandle({_id: item._id})}>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                             <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                         </svg>
 
                        </button>
                      }
                       {item.review}
                       </div>
                     </div>
                </div>
               
            )
         })} 
       </div>

    </div>
  )
}
