import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


export default function CommentList({ postId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const getComments = async() => {
            console.log("Post id", postId);
            try {
                const response = await fetch(`/api/comments/${postId}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setComments(data);
                }
            } catch(err) {
                console.log("Can't fetch comment list", err);
            }
        }
        getComments();
    }, []);

    const convertDate = (mongodate) => {
        let date = new Date(mongodate.substr(0,10));
        return date.toUTCString().substring(0, 16);
    }

    return (
        <div className='comment-section'>
            {
                comments.map((comment) => {
                    return (
                        <div key={comment._id} className="comment">
                            <h4>{comment.username}</h4>
                            <p>{comment.body}</p>
                            <p className="font-thin">{convertDate(comment.createdAt)}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}