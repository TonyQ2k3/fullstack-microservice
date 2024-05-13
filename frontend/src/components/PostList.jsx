import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


export default function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async() => {
            try {
                const response = await fetch(`/api/posts`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setPosts(data);
                }
            } catch(err) {
                console.log("Can't fetch post list", err);
            }
        }
        getPosts();
    }, []);

    return (
        <div>
            {
                posts.map((post) => {
                    return (
                        <div key={post._id} className="card">
                            <div className='title-wrapper'>
                                <h3>{post.title}</h3>
                                <Link to={`/posts/${post._id}`}>
                                    <p><small>More details {'>'}</small></p>
                                </Link>
                            </div>
                            <p>{post.body.slice(0,200)}...</p>
                        </div>
                    )
                })
            }
            {
                posts.length === 0 && (
                    <p className="text-center">
                        No posts yet.
                    </p>
                )
            }
        </div>
    )
}