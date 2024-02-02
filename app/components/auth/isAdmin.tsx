import React, { useEffect, useState } from 'react';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { API_URL } from '@/app/setting/API';
import axios from '@/app/setting/our_axios';

function IsAdmin<T>(Component: React.ComponentType<T>) {
  return function (props: T) {
    const [isAdmin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setLoading(true);
      axios.get(`${API_URL}/checking`).then((res) => {
        if (res.status === 200) {
          setAdmin(true);
          //   setLoading(false)
        }
        setLoading(false);
      });
    });
    const router = useRouter();
    const pathname = usePathname();

    if (loading) {
      return <p>loading</p>;
    }

    if (!isAdmin) {
      alert('you are not admin ');
      router.push('/');
    } else {
      return <Component {...props!} />;
    }
  };
}

export default IsAdmin;
