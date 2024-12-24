import React, { useEffect, useState } from 'react'
import { Container } from '../component/index'
import PostForm from '../component/post-form/PostForm'
import DBservice from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [Posts,setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate();

    useEffect(() => {
      if (slug) {
        DBservice.getPost(slug)
        .then((post)=>
            setPosts(post)
        )
      }
    
      
    }, [slug,navigate])
    
  return Posts ? (
    <div className='py-8'>
        <Container>
        <PostForm post={Posts} />
        </Container>
    </div>
  ): null;
}

export default EditPost