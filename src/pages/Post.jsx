import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DBservice from '../appwrite/config.js'
import { Button, Container } from "../component/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
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
    }

    return post ? (
        <div className="py-8">
            <Container>
            {isAuthor && (
                        <div className="absolute w-1/5 right-16 top-6 flex justify-evenly">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3 w-6 mb-4 mt-4 pr-11 rounded pt-2">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" className="mr-3 w-6 mb-4 mt-4 pr-14 rounded pt-2" onClick={deletePost}>
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
                    <Button bgColor="bg-slate-500" className=" w-8 p-2 text-black text-center rounded-md" onClick={giveLike} >
                        {(post.likes).length}
                    </Button>
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}