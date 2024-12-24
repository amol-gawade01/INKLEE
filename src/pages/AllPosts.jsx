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
    <div>
        <Container>
           <div className='flex flex-wrap'>
            {AllPostCards.map((Posts) => (
                <div key={Posts.$id} className='p-2 w-1 '>
                    <PostCard $id={Posts.$id} title={Posts.title} featuredImage={Posts.featuredImage} />
                </div>
            ))}
           </div>
        </Container>
    </div>
  )
}

export default AllPosts