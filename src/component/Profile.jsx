import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DBservice from "../appwrite/config";
import PostCard from "./PostCard";


function Profile() {
  const userData = useSelector((store) => store.auth.userData);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const posts = await DBservice.getAllPosts();
        if (posts) {
          const filteredPosts = posts.documents.filter(
            (post) => post.userId === userData?.$id
          );
          setUserPosts(filteredPosts);
        } else {
          setUserPosts([]);
        }
      } catch (error) {
        console.log("Error while getting user posts from backend", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userData]);

  return (
    <div className="w-full m-auto mt-16 overflow-hidden select-none">
      <div className="lg:w-1/3 w-full m-0 flex flex-col lg:flex-row items-center  mb-24 lg:ml-24">
        <div>
          <img src="https://res.cloudinary.com/vipeocloud/image/upload/v1736617786/user_td7ndc.png" className="lg:w-full lg:h-40 w-40 h-48" alt="User" />
        </div>
        <div className="lg:w-56  text-black m-4 lg:ml-24">
          <h3 className="font-semibold text-2xl dark:text-white">{userData?.name}</h3>
          <h3 className="font-semibold text-gray-600 dark:text-gray-400 text-xl">
            Blogs: {userPosts?.length || 0}
          </h3>
        </div>
      </div>

      {loading ? (
        <h3 className="ml-24">Loading...</h3>
      ) : userPosts.length === 0 ? (
        <h3>No posts available</h3>
      ) : (
        <div className="min-h-screen m-4 bg-gray flex flex-row flex-wrap gap-4 ml-14 lg:ml-20">
          {userPosts.map((post) => (
            <PostCard
              key={post.$id}
              $id={post.$id}
              title={post.title}
              featuredImage={post.featuredImage}
              likes={post.likes}
              userId={post.userId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
