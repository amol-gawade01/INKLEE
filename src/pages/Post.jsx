import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DBservice from "../appwrite/config.js";
import { Button, Container, Input,CommentCompo } from "../component/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

export default function Post() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      DBservice.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });

      DBservice.getComment(slug).then((comment) => {
        if (comment) {
            setComments(comment.documents)
        }else{
            setComments([])
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
    const updatedComments = comments.map(comment => 
      comment.$id === commentId ? { ...comment, content: newContent } : comment
    );
    setComments(updatedComments);
  };
  

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter((comment) => comment.$id !== commentId);
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
            className="rounded-xl"
          />
        </div>
        <div>
          <Button
            bgColor="bg-slate-500"
            className=" w-8 p-2 text-black text-center rounded-md"
            onClick={giveLike}
          >
            {post.likes.length}
          </Button>
        </div>
        <div className="w-full mb-6" >
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css mb-14">{parse(post.content)}</div>
        <div className="w-full bg-slate-200 min-h-auto flex flex-col">
          <form onSubmit={handleSubmit(addComment)}>
            <Input
              placeholder="Add your comment"
              className="m-2 w-[48rem] p-3 text-black "
              {...register("comment", { required: true })}
            />
            <Button bgColor="bg-blue-500" className="w-36 m-2 p-2 rounded-md">
              Add Comment
            </Button>
          </form>
          <h5 className="text-black m-3">Comments</h5>
          <div className="w-full flex flex-col bg-blue-300">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <CommentCompo
                  key={comment.$id}
                  content={comment.content}
                  username={comment.name}
                  userId={comment.userId}
                  commentId={comment.$id}
                  onEditComment={(newContent) => handleCommentEdit(comment.$id, newContent)} 
                  onDeleteComment={handleDeleteComment}
                  
                />
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
