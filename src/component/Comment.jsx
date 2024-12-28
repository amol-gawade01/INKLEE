import React, { useState } from "react";
import { useSelector } from "react-redux";
import DBservice from "../appwrite/config.js";  


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
    <div className="flex flex-col w-1/2 mb-4 ml-6 bg-slate-500 rounded-md mt-2">
      <div className="w-auto flex flex-row">
        <h4 className="text-black">{username}</h4>
        {userData && userData.$id === userId && (
          <>
            <button className="ml-14" onClick={handleDelete}>Delete</button>
            <button className="ml-14" onClick={handleEditToggle}>
              {editComment ? "Cancel" : "Edit"}
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
          <button onClick={handleSave} className="mt-2 bg-blue-500 text-white p-2 rounded">
            Save
          </button>
        </div>
      ) : (
        <p className="text-black">{content}</p>
      )}
    </div>
  );
}

export default CommentCompo;
