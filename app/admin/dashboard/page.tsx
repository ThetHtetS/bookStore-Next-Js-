// 'use client';

// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import { getLength, useDispatch } from '@/lib/redux';

// export default function IndexPage() {
//   const dispatch = useDispatch();
//   const [data, setData] = useState();

//   useEffect(() => {
//     dispatch(getLength())
//       .unwrap()
//       .then((data) => console.log('Response from thunk ', setData(data)));
//   }, []);

//   return (
//     <div className="pt-12 px-12">
//       {!!data && (
//         <div className="grid  md:grid-cols-3 lg:grid-cols-4 gap-12 ">
//           <Link href="/admin/users">
//             <div className="border shadow py-12 w-full px-6 text-center text-amber-500">
//               <div className="text-2xl text-center">{data.user}</div>
//               Total Users
//             </div>
//           </Link>
//           <Link href="/admin/books">
//             <div className="border shadow py-12 w-full  px-4 text-center text-green-700">
//               <div className="text-2xl text-center"> {data.book}</div>
//               Totol Books
//             </div>
//           </Link>
//           <Link href="/admin/category">
//             <div className="border shadow py-12 w-full px-6 text-center text-blue-600">
//               <div className="text-2xl text-center">{data.category}</div>
//               Categories
//             </div>
//           </Link>
//           <Link href="/admin/orders">
//             <div className="border shadow py-12 w-full px-12 text-center text-fuchsia-950">
//               <div className="text-2xl text-center"> {data.order} </div>
//               Orders
//             </div>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }
