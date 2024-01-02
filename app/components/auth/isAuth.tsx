import React from 'react';

import {selectAuth, useSelector} from "@/lib/redux";
import {useRouter} from "next/navigation";
import { useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation';
function IsAuth<T>(Component: React.ComponentType<T>) {
    return (props: T) => {

        const router = useRouter();
        const pathname = usePathname();
        let token= window.localStorage.getItem("token")
        console.log('Path name ',pathname);
        if (!token) {
            router.push('/account/login');
        }
         else{
          return (
            <>
                <Component {...props!} />
            </>
        );
         }
      
    };
}

export default IsAuth;