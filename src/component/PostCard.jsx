import React from 'react'
import DBservice from '../appwrite/config'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PostCard({
  $id,
  title,
  featuredImage,
  likes
}) {

  const userStatus = useSelector((store) => store.auth.status)

  return (
    <Link to={userStatus ? `/post/${$id}`:`/login`}>
    <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <img src={DBservice.getFilePreview(featuredImage)} alt={title}
            className='rounded-xl' />

        </div>
        <h2 
        className='text-xl font-bold'
        >{title}</h2>
        <h3 className='bg-gray w-5'>{(likes).length}</h3>
    </div>
</Link>
  )
}

export default PostCard