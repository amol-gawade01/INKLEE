import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice';




function LogoutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = () =>{
    authService.logout()
    .then(() =>  dispatch(logout()))
   
  }

  return (
    
        <button className='inline-bock px-6 py-2 duration-200 hover:bg-black dark:hover:bg-white text-white dark:lg:text-white lg:text-black rounded-full hover:text-white dark:hover:text-black '
        onClick={logoutHandler}>Logout</button>
    
  )
}

export default LogoutBtn