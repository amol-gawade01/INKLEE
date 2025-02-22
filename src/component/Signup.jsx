import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {Input,Button, Logo} from './index.js'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const [error,setError] = useState()
    const navigate = useNavigate()
    const {register,handleSubmit} = useForm();


    const onSignup = async (data) =>{
    setError("")
    try {
        const userSignup  = await authService.createAccount(data)
        if (userSignup) {
            navigate("/login")
        }
    } catch (error) {
        setError(error.message)
    }
    }
  return (
    <div className="flex items-center justify-center lg:w-full w-[90%] m-auto lg:m-0  lg:mt-20 selct-none">
    <div className={`mx-auto w-full max-w-lg bg-gray-100 dark:bg-black rounded-xl p-10 border border-black/10`}>
    <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
               <h2 className='font-semibold text-2xl'>INKLEE</h2>
            </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight dark:text-white">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60 dark:text-white">
            Already have an account?&nbsp;
            <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline dark:text-white"
            >
                Sign In  
            </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSignup)}>
            <div className='space-y-5'>
                <Input
                label="Full Name: "
                placeholder="Enter your full name"
                {...register("name", {
                    required: true,
                })}
                />
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
                    required: true,})}
                />
                <Button type="submit" className="w-full text-white rounded-md dark:text-black font-semibold dark:bg-white bg-black" >
                    Create Account
                </Button>
            </div>
        </form>
    </div>

</div>
  )
}

export default Signup