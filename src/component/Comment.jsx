import React, { useState } from "react";
import { useSelector } from "react-redux";
import DBservice from "../appwrite/config.js"; 
import user from "../../src/assets/Images/user.png" 
import deleteblack from '../../src/assets/Images/deleteblack.png'
import blackpencil from "../../src/assets/Images/blackpencil.png"


function CommentCompo({ content, username, userId, commentId,onEditComment,onDeleteComment }) {
  const userData = useSelector((store) => store.auth.userData);
  const [editComment, setEditComment] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleEditToggle = () => {
    setEditComment((prev) => !prev);
  };

  const handleContentChange = (event) => {
    setEditedContent(event.target.value);
  };

  const handleSave = async () => {
    try {
      if (editedContent !== content) {
        await DBservice.updateComment(commentId, editedContent);  // Function to update comment in Appwrite
        onEditComment(editedContent)
      }
      setEditComment(false);  // Close the edit input field after saving
    } catch (error) {
      console.log("Error updating comment:", error);
    }
  };

  const handleDelete = async () => {
    try {
      onDeleteComment(commentId);  
      await DBservice.deleteComment(commentId); 
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="w-full flex flex-col lg:w-1/2 mb-4 ml-6 bg-white  rounded-md mt-5">
      <div className=" lg:w-auto flex flex-row">
        <img src={user} className="w-7 h-7 items-center mr-2"/>
        <h4 className="text-black text-lg font-semibold">{username}</h4>
        {userData && userData.$id === userId && (
          <>
            <button className="ml-14" onClick={handleDelete}>
              <img src={deleteblack} className="w-6 h-6" />
            </button>
            <button className="ml-14" onClick={handleEditToggle}>
              {editComment ? "Cancel" : <img src={blackpencil} className="w-5 h-5"/>}
            </button>
          </>
        )}
      </div>
      {editComment ? (
        <div>
          <input
            type="text"
            value={editedContent}
            onChange={handleContentChange}
            className="p-2 w-full text-black rounded-md"
          />
          <button onClick={handleSave} className="mt-2 bg-black text-white p-1 rounded">
            Save
          </button>
        </div>
      ) : (
        <p className="text-black font-mono ml-8 mt-2">{content}</p>
      )}
    </div>
  );
}

export default CommentCompo;
