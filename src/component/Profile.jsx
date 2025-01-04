import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DBservice from "../appwrite/config";
import PostCard from "./PostCard";
import user from "../../src/assets/Images/user.png";

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
    <div className="w-full m-auto mt-16 overflow-hidden">
      <div className="w-1/3 m-0 flex items-center mb-24 ml-24">
        <div>
          <img src={user} className="w-42 h-40" alt="User" />
        </div>
        <div className="w-56 text-black m-4 ml-20">
          <h3 className="font-semibold text-2xl">Name: {userData?.name}</h3>
          <h3 className="font-semibold text-gray-600 text-xl">
            Blogs: {userPosts?.length || 0}
          </h3>
        </div>
      </div>

      {loading ? (
        <h3>Loading...</h3>
      ) : userPosts.length === 0 ? (
        <h3>No posts available</h3>
      ) : (
        <div className="min-h-screen m-4 bg-gray flex flex-row flex-wrap gap-4 ml-14">
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
