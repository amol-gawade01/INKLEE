import React, { useEffect, useState } from 'react'
import DBservice from '../appwrite/config'
import { PostCard } from '../component'
import { Container } from '../component/index'


function AllPosts() {
    const [AllPostCards,setAllPostCards] = useState([])

    useEffect( () => {
      try {
        DBservice.getAllPosts()
        .then((post) => {
           console.log(post)
          if(post) setAllPostCards(post.documents || [])
        })
      } catch (error) {
         console.log("Error while getting posts",error)
      }
        
        
      } 
    , [])

    
    

  return (
    <div className='w-full mt-10'>
        <Container>
           <div className='flex flex-col ml-6 lg:flex-row flex-wrap w-auto'>
            {AllPostCards.map((Posts) => (
                <div key={Posts.$id} className='p-2 w-1/4 '>
                    <PostCard $id={Posts.$id} title={Posts.title} featuredImage={Posts.featuredImage} likes={Posts.likes} userId={Posts.userId}/>
                </div>
            ))}
           </div>
        </Container>
    </div>
  )
}

export default AllPosts