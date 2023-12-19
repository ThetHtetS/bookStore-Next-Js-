//import React from 'react'
"use client"

import { selectBooks, selectOrder_items, selectOrders, useSelector } from "@/lib/redux"
import Link from "next/link";

export default function Page({ params }: { params: { id: number } }) {
    let orders = useSelector(selectOrders);
    let order_items= useSelector(selectOrder_items);
    let books= useSelector(selectBooks)
    let order = orders.filter(order=> order._id==params.id);
    let order_item = order_items.filter(item=>item.order== order[0]._id)
    let subtotal =0;
    console.log(order);
    console.log(order_item);
    
    
    return (
   <div className=" h-screen px-16 ">
        <div className="bg-white w-2/5 border h-60 mt-16  shadow px-4 pt-3">
           <h1 className="font-bold text-2xl">Order Info</h1>
           {order && <div className=" pt-6 space-y-3">
            <div className="flex item-center justify-start gap-10">
                <div className="ml-3 flex item-centers gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>

                    Name
                </div>
                <div className="">{order[0].name}</div>
            </div>
            <div className="flex item-centers justify-start gap-9">
                <div className="ml-3 flex item-centers gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>

                    Phone
                </div>
                <div className="">{order[0].phone}</div>
            </div> 
            <div className="flex item-centers justify-start gap-6">
                <div className="ml-3 flex item-centers gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span>address</span>
                </div>
                <div className="">{order[0].address}</div>
            </div>
            <div className="flex item-centers justify-start gap-12"> 
                <div className="ml-3 flex item-centers gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    total
                </div>
                <div className="">{subtotal}</div>
            </div>
           </div>}
        </div>

        <div className="mt-6">
        {
        !!order_item.length && <table className="table-auto w-full border-separate border-spacing-y-7">
        <thead className=''>
              <tr className=''>
                <th className='border-b pb-4 text-start'>PROUDCT</th>
           
                <th className='border-b pb-4 text-start'>QUANTITY</th>
                <th className='border-b pb-4 text-start'>TOTAL</th>
              </tr>
          </thead>
          {order_item.map((item)=>{
            let book= books.filter(book=> book._id == item.book )
             subtotal += book[0].price* item.qty;
            
            return(
            
            <tbody className=''>
              <tr className=''>
                <td className='border-b pb-5'>
                  {book[0].title}     
                </td>
               
                <td className='border-b pb-5'> 
                 <div className="">{item.qty}</div>
                </td>
                <td className='border-b pb-5'> {item.qty* book[0].price}</td>
              </tr>
            </tbody> 
      )})}
        </table>  
      }

        {!!order_item.length &&        
         <div className='text-right mr-16'>
          Subtotal: {subtotal}
          <div className='pt-3'>
           <Link href="/checkout">
             <button className='px-3 py-1 rounded-lg bg-black text-white'>Check Out</button>
           </Link>   
                    
         </div>
   
          </div>}

        </div>

   </div>
)}