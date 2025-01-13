import React, { useEffect, useState } from "react";
import DBservice from "../appwrite/config";
import { Container, WelcomePage,Shimmer } from "../component/index";
import PostCard from "../component/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    DBservice.getAllPosts()
      .then((response) => {
        const post = response.documents || [];
        if (post) {
          setPosts(post?.filter((p) => p.likes.length >= 1));
        }
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  



  if (posts.length === 0) {
    return (
      <div>
        <div className="w-[90%] m-auto ">
          <WelcomePage />
        </div>
        <div className="w-full py-8 mt-4 text-center">
         <Shimmer/>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-[90%] m-auto">
        <WelcomePage />
      </div>
      <Container>
        <div className="text-center mb-4">
          <h3 className="text-black dark:text-white font-semibold text-3xl text-center items-center mt-5">
          
            Hot Picks
          </h3>
        </div>
        <div className="flex flex-wrap flex-col ml-4 lg:ml-8 mb-16 lg:flex-row">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4 m-3">
              <PostCard
                $id={post.$id}
                title={post.title}
                featuredImage={post.featuredImage}
                likes={post.likes}
                userId={post.userId}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
