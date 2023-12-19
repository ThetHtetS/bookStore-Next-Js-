import Book from '@/lib/redux/slices/bookSlice/book'
import Category from '@/lib/redux/slices/categorySlice/category'
import React from 'react'

export default function BooksList(props:{books: Book[], categories: Category[], addToCart 
}) {
    let {books,categories, addToCart}=props;
    return (
    <div className='grid md:grid-cols-2 lg:grid-cols-4 mx-auto gap-12'>
   
      {books.map(item=> {
        var cat= categories.filter(cat=> cat._id== item.category)
        return(
          <div className=" bg-white h-48 group">
                <img src='https://novelbookstore.co/cdn/shop/products/IMG_94153_900x.jpg?v=1651213560'/>
                <div className="mt-3">{item.title}</div>
                <div>{item.price} <span className='text-bold'>MMK</span></div>
                <div className=""> {item.qty} stock</div>
                <div className='flex justify-between'>
                    {cat.map(c=>(<div>{c.name}</div>))}  
                    <button onClick={()=>addToCart( {_id: 5,  book: item._id , qty:1})} className='border rounded px-1 py-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>
                        Add to Cart
                    </button>
                </div>
          </div>
        )
      })}     
  </div>
  )
}
