import React, { useState, useEffect } from 'react';
import PostList from '../components/PostList';

export default function Posts() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(`/api/auth/user`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const user = await response.json();
            if (response.ok) {
                console.log(user);
                setUser(user);
            }
        }
        getUser();
    }, []);

    return (
        <main>
            <nav className="ticket-nav">
                <div>
                    <h2>Blogs</h2>
                    <p><small>View all blog posts</small></p>
                </div>
                {
                    user !== null ? (
                        <a href="/posts/create">
                            <button className="btn-primary">Create</button>
                        </a>
                    ) : (<></>)
                }
            </nav>
            <PostList />
        </main>
    );
}