import React, { useEffect, useState } from "react";
import DBservice from "../appwrite/config";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import heart from "../../src/assets/Images/heart.png";

function PostCard({ $id, title, featuredImage, likes, userId }) {
  const userStatus = useSelector((store) => store.auth.status);
  const [postUser, setPostUser] = useState("");
  const [Image, seTImage] = useState(null);

  useEffect(() => {
    const image = DBservice.getFilePreview(featuredImage);
    seTImage(image);
    DBservice.getUser(userId).then((user) => {
      if (user) {
        setPostUser(user.username);
      }
    });
  }, []);

  return (
    <Link to={userStatus ? `/post/${$id}` : `/login`}>
      <div className="relative w-[300px] h-[300px] bg-gray-200 rounded-xl p-4">
       
        <div className="w-full justify-center mb-4">
          <img src={Image} alt={title} className="rounded-xl w-[270px] h-[200px]" />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
        <h4 className="text-gray-600 font-semibold">By {postUser}</h4>

        {likes && (
          <div className="absolute bottom-3 right-4 flex items-center bg-white shadow-md rounded-full px-2 py-1">
            <img src={heart} className="w-5 h-5 mr-1" alt="Likes" />
            <h3 className="text-black text-sm font-bold">{likes.length}</h3>
          </div>
        )}
      </div>
    </Link>
  );
}

export default PostCard;
