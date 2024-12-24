import React, { useEffect, useState } from "react";
import DBservice from "../appwrite/config";
import { Container } from "../component/index";
import PostCard from "../component/PostCard";

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        DBservice.getAllPosts()
            .then((response) => {
                console.log("Fetched posts:", response); // Debugging log
                setPosts(response.documents || []); // Safely set posts to the array or empty
            })
            .catch((error) => console.error("Error fetching posts:", error));
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div>No Posts... Be the first by creating a Post</div>
                </Container>
            </div>
        );
    }

    return (
        <div>
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
