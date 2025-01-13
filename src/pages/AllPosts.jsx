import React, { useEffect, useState } from 'react'
import DBservice from '../appwrite/config'
import { PostCard } from '../component'
import { Container,Input,Shimmer } from '../component/index'


function AllPosts() {
    const [AllPostCards,setAllPostCards] = useState([])
    const [searchBlogs,setSearchBlogs] = useState([])

    useEffect( () => {
      try {
        DBservice.getAllPosts()
        .then((post) => {
      
          if(post) setAllPostCards(post.documents || [])
        })
      } catch (error) {
         console.log("Error while getting posts",error)
      }
        
        
      } 
    , [])

    const filterBlogs = async () => {
      try {
        // Fetch all posts
        const post = await DBservice.getAllPosts();
        if (!post) return;
    
      
        const filteredPosts =
          searchBlogs.trim() === ""
            ? post.documents || []
            : post.documents.filter((p) =>
                p.title.toLowerCase().includes(searchBlogs.toLowerCase())
              );
    
       
        setAllPostCards(filteredPosts);
      } catch (error) {
        console.error("Error while getting posts", error);
      }
    };
    

  
    

  return (
    <div className='w-full mt-10'>
      <div className='w-screen ml-14 lg:ml-48 m-auto mb-10 flex  justify-between'>
        <Input
        className="w-1/2 rounded-2xl border border-gray-400 "
        placeholder="search your favourite blog"
        onChange={(e) => setSearchBlogs(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") filterBlogs();
        }}
        />
        <button className='w-1/2 h-[20px] ml-5' onClick={filterBlogs} >
          <img src="https://res.cloudinary.com/vipeocloud/image/upload/v1736781574/search_pfqcle.png" className='w-10 h-10'/>
        </button>
      </div>
       {AllPostCards.length > 0 ? ( <Container>
           <div className='flex flex-col ml-2 lg:flex-row flex-wrap w-auto'>
            {AllPostCards.map((Posts) => (
                <div key={Posts.$id} className='p-2 w-1/4 m-3'>
                    <PostCard $id={Posts.$id} title={Posts.title} featuredImage={Posts.featuredImage} likes={Posts.likes} userId={Posts.userId}/>
                </div>
            ))}
           </div>
        </Container>):(<Shimmer/>)}
    </div>
  )
}

export default AllPosts