import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DBservice from "../appwrite/config";
import PostCard from "./PostCard";

function Profile() {
  const userData = useSelector((store) => store.auth.userData);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

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
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchUserPosts();
  }, [userData]);

  return (
    <div className="w-full m-auto flex flex-col">
      <div className="w-56 bg-gray-300 text-black m-4 ml-8">
        <h3>Username: {userData?.name}</h3>
        <h4>Blogs: {userPosts?.length || 0}</h4>
      </div>
      {loading ? (
        <h3>Loading...</h3> // Show loading while fetching data
      ) : userPosts.length === 0 ? (
        <h3>No posts available</h3> // Show if no posts found
      ) : (
        <div className="w-[25%] min-h-screen m-4 bg-gray flex">
          <div className="w-auto">
            {userPosts.map((post) => (
              <PostCard
                key={post.$id}
                $id={post.$id}
                title={post.title}
                featuredImage={post.featuredImage}
                likes={post.likes}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
