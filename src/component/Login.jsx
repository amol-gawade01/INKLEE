import React, { useState } from 'react'
import { login as authLogin} from '../store/authSlice'
import authService from '../appwrite/auth'
import { Link,useNavigate } from 'react-router-dom'
import {Button,Input,Logo} from './index'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

function Login() {
    const navigate = useNavigate();
    const dispatch  = useDispatch();
    const [error,setError] = useState("")
    const {register,handleSubmit} = useForm();

    const onLogin = async (data) => {
       setError('')
       try {
       const session = await authService.loginUser(data)
       if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin(userData))
            navigate("/")
       }
       } catch (error) {
        setError(error.message)
       }
    }

  return (
    <div
    className='flex items-center justify-center lg:w-full w-[90%] m-auto lg:m-0  lg:mt-20'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 dark:bg-black  rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                    <h2 className='font-semibold text-2xl dark:text-white'>INKLEE</h2>
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight dark:text-white">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60 dark:text-white">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline dark:text-white"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(onLogin)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full text-white rounded-md dark:text-black font-semibold dark:bg-white bg-black">Sign in</Button>
            </div>
        </form>
        </div>
    </div> 
  )
}

export default Login