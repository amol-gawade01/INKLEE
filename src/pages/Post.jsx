import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DBservice from "../appwrite/config.js";
import { Button, Container, Input, CommentCompo } from "../component/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import heart from "../../src/assets/Images/heart.png";
import likeheart from "../../src/assets/Images/likeheart.png";

export default function Post() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [userLiked, setUserLiked] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { slug } = useParams();
  console.log(slug);
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      DBservice.getPost(slug).then((post) => {
        if (post){
          setPost(post)
          setUserLiked(post.likes.includes(userData.$id))
        }
        else navigate("/");
      });
      
      DBservice.getComment(slug).then((comment) => {
        if (comment) {
          console.log(comment);
          setComments(comment.documents);
        } else {
          setComments([]);
        }
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    DBservice.deletePost(post.$id).then((status) => {
      if (status) {
        DBservice.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const giveLike = async () => {
    //Optimistic rendering
    if (!userData) {
      console.log("User is not logged in.");
      return;
    }

    const userId = userData.$id;

    const userHasLiked = post.likes.includes(userId);
    const updatedLikes = userHasLiked
      ? post.likes.filter((id) => id !== userId)
      : [...post.likes, userId];

    setPost((prev) => ({ ...prev, likes: updatedLikes }));
    setUserLiked((prev) => !prev);

    try {
      await DBservice.incrLike(userId, slug);
    } catch (error) {
      console.error("Error toggling like:", error);

      setPost((prev) => ({
        ...prev,
        likes: userHasLiked
          ? [...prev.likes, userId] // Rollback to "liked"
          : prev.likes.filter((id) => id !== userId), // Rollback to "unliked"
      }));
    }
  };

  const addComment = async (data) => {
    try {
      await DBservice.addComment({
        slug,
        content: data.comment,
        userId: userData.$id,
        name: userData.name,
      });
      console.log("Comment added successfully");
      const updatedComments = await DBservice.getComment(slug);
      setComments(updatedComments.documents);

      reset();
    } catch (error) {
      console.log("Comment not added ", error);
    }
  };

  const handleCommentEdit = (commentId, newContent) => {
    const updatedComments = comments.map((comment) =>
      comment.$id === commentId ? { ...comment, content: newContent } : comment
    );
    setComments(updatedComments);
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.$id !== commentId
    );
    setComments(updatedComments);
  };

  return post ? (
    <div className="py-8 select-none">
      <Container>
        {isAuthor && (
          <div className="absolute w-1/5 right-16 top-6 flex justify-evenly">
            <Link to={`/edit-post/${post.$id}`}>
              <Button
                bgColor="bg-green-500"
                className="mr-3 w-6 mb-4 mt-4 pr-11 rounded pt-2"
              >
                Edit
              </Button>
            </Link>
            <Button
              bgColor="bg-red-500"
              className="mr-3 w-6 mb-4 mt-4 pr-14 rounded pt-2"
              onClick={deletePost}
            >
              Delete
            </Button>
          </div>
        )}
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2 mt-8">
          <img
            src={DBservice.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl w-full h-[700px]"
          />
        </div>
        <div className="ml-8 bg-white w-full flex items-center">
          <button
            className="flex items-center  text-black p-2 rounded-md hover:focus:outline-none"
            onClick={giveLike}
          >
            {userLiked ? (<img src={likeheart} alt="Like" className="w-6 h-6 mr-2" />):(<img src={heart} alt="Like" className="w-6 h-6 mr-2" />)}
            {post.likes.length}
          </button>
        </div>

        <div className="w-full mb-6 ml-4">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css mb-14 ml-4">{parse(post.content)}</div>

        <div className="w-full  min-h-auto flex flex-col">
          <form onSubmit={handleSubmit(addComment)} className="w-full flex justify-around">
            <Input
              placeholder="Add your comment"
              className="m-2 w-[64rem] p-3 text-black border border-black placeholder-gray-700"
              {...register("comment", { required: true })}
            />
            <Button bgColor="bg-gray-400" className="w-full m-2 p-1 rounded-md font-semibold text-black">
              Add Comment
            </Button>
          </form>
          <h5 className="text-black m-3">Comments</h5>
          <div className="w-full flex flex-col ">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div className="m-3">
                  <CommentCompo
                  key={comment.$id}
                  content={comment.content}
                  username={comment.name}
                  userId={comment.userId}
                  commentId={comment.$id}
                  onEditComment={(newContent) =>
                    handleCommentEdit(comment.$id, newContent)
                  }
                  onDeleteComment={handleDeleteComment}
                />
                  </div>
              ))
            ) : (
              <p className="text-gray-500 p-2">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
