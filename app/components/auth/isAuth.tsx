import React from 'react';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
//import { selectAuth, useSelector } from '@/lib/redux';

function IsAuth<T>(Component: React.ComponentType<T>) {
  return function (props: T) {
    const router = useRouter();
    const pathname = usePathname();
    const token = window.localStorage.getItem('token');
    if (!token) {
      router.push('/account/login');
    } else {
      return <Component {...props!} />;
    }
  };
}

export default IsAuth;
