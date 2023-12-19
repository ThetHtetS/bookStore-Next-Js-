'use client'
import React, { useState } from 'react'

export default function page() {
    let [input,setInput]=useState('')
    let submitBtn =()=>{
        let data ={
            _id: 6,
            name: input
        }
        console.log(data);
        
    }
  return (
    <div className='px-auto pt-12 '>
        <div className="mx-auto ml--5 px-5 pt-3  w-1/3 bg-white h-60 border shadow">
        <div className="pb-12">Add New Category</div>
         <div className='space-y-8'>
        
         <input value={input} onChange={e=>setInput(e.target.value)} type="text" name="price" id="price" 
         className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20
          text-gray-900 ring-1 placeholder:text-gray-400 
             sm:text-sm sm:leading-6"
           placeholder="Enter New Category "/>
          <div className='flex gap-3'>
          <button onClick={submitBtn}  className=' border px-4 py-1 bg-green-400'>save</button>
          <button className='gray-300 border px-2 py-1 bg-gray-50'>cancel</button>
          </div>
         </div>
        </div>
    </div>
  )
}
