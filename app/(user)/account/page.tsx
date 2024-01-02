"use client"

import { selectAuth, selectOrders, useDispatch, useSelector } from '@/lib/redux'
import { getOrderByUserId } from '@/lib/redux/slices/orderSlice/thunks';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function page() {
  let yourOrder = useSelector(selectOrders);
  let dispatch =useDispatch();
console.log("your order", yourOrder);
  useEffect(()=>{
    let uid =localStorage.getItem("Uid");
    dispatch(getOrderByUserId(uid))
  },[])
  
  let router = useRouter();
  let token = localStorage.getItem("token");
  
  
  if(!token){
    
    router.push("/account/login")
  
  }

  console.log( "uid", localStorage.getItem("Uid"));
 let username = localStorage.getItem("username");
 //console.log( "userName",username);
 
    let logout=() =>{
    localStorage.removeItem("token")
    localStorage.removeItem("Uid");
    localStorage.removeItem("username")
    router.push("/account/login")
  }
  let subtotal:any;


  return (
    <div>
      <div className='text-center'>
        <span className='text-3xl'>
            My Account
        </span>
        <p>
           {username} 
        </p>
        <p>
          <button onClick={logout} className='bg-red-300 rounded-sm px-2 py-1 border'>Log out</button>
        </p>
      </div>
       
       <div className="px-10 mt-3">
        <div className="text-right mr-16">
          <span className="text-2xl">Your Order</span> <br />
          {!yourOrder.length && <span >You have no Order</span>}
        </div>
       { !!yourOrder.length &&
       <table className="table-auto w-full border-separate border-spacing-y-7">
        <thead className=''>
              <tr className=''>
                <th className='border-b pb-4 text-start'>PROUDCT</th>
                <th className='border-b pb-4 text-start'>Status</th>
                <th className='border-b pb-4 text-start'>PRICE</th>
                <th className='border-b pb-4 text-start'>QUANTITY</th>
                <th className='border-b pb-4 text-start'>TOTAL</th>
              </tr>
          </thead>
          {yourOrder.map((item)=>{
            
         return  item.orderItem.map(order=>{
           // subtotal += book[0].price* item.qty;
           return(
            
            <tbody>
              <tr>
                <td className='border-b pb-5'>
                  {order.book.title}
                </td>
                <td className='border-b pb-5 -ml-8'>      
                    {item.status=="1"?"Done": "Pending"}
                  </td>
                <td className='border-b pb-5'>{order.book.price}</td>
                <td className='border-b pb-5'>      
                    <div className=" px-4">{order.qty}</div>
                  </td>
                <td className='border-b pb-5'> {order.qty* order.book.price}</td>
              </tr>
            </tbody> 
      )
          })
      })}
        </table>
        }
       </div>

    </div>
  )
}
