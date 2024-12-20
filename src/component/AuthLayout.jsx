import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'


export default function AuthLayout({children,authentication = true}) {
    const [loader,setLoader] = useState(true)
    const navigate = useNavigate();
    const authStatus = useSelector((store) => store.auth.status)

    useEffect(()=> {
     
        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } else if(!authentication && authStatus === authentication){
            navigate("/")
        }
        setLoader(false)
 
    },[authStatus,authentication,navigate])

  return loader ? <>Loading...</>:<>{children}</>
}

