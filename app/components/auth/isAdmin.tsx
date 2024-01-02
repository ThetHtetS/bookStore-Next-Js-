import React, { useEffect, useState } from 'react';
import axios from "@/app/setting/our_axios";
import {API_URL} from "@/app/setting/API";

import {useRouter} from "next/navigation";
import { useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation';

function IsAdmin<T>(Component: React.ComponentType<T>) {
    return (props: T) => {
       let [isAdmin,setAdmin]= useState(false);
       let [loading,setLoading]= useState(true);
    useEffect(()=>{
        setLoading(true)
        axios.get(API_URL+"/checking").then(res=>{if(res.status==200){
          setAdmin(true)
        //   setLoading(false)
        }
        else if(res.status==201){
          
        }
        setLoading(false)
    })
    })
        const router = useRouter();
        const pathname = usePathname();
        
        if(loading){
            return <p>loading</p>
        }

        if (!isAdmin) {
            alert("you are not admin ")
            router.push('/');
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

export default IsAdmin;