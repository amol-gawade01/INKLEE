import React, { useState } from 'react'
import DBservice from '../appwrite/config'
import { AuthService } from '../appwrite/auth'
import { Container } from '../component/index'

function Home() {
    const user = AuthService.getCurrentUser()
    const [posts,setPosts] = useState([])
    useEffect(() => {
        
            DBservice.getAllPosts()
            .then((post) =>
                setPosts(post) 
            )
     
    }, [])
    
    if (posts.length > 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
               <Container>
                <div>
                   No Posts...
                   Be first by creating Post
                </div>
               </Container>
            </div>
        )
    }else{
        return (
            <div>
            <Container>
               <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1 '>
                        <PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage} />
                    </div>
                ))}
               </div>
            </Container>
        </div>
        )
    }
}

export default Home