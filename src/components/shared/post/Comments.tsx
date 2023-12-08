'use client'
import React, { useEffect, useState } from 'react';
import { getPostsComments } from '@/services/posts';
import CommentSection from '../CommentSection';

async function Comments({ postId }: any) {
    const [commentsState, setCommentsState] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            const commentsResponse = await getPostsComments(postId, {});
            setCommentsState(commentsResponse.comments);
            console.log("Comments", commentsResponse);
        };

        fetchComments();
    }, [postId]); // Fetch comments whenever postId changes

    const updateComments = async () => {
        // Re-fetch comments
        const commentsResponse = await getPostsComments(postId, {});
        setCommentsState(commentsResponse.comments);
        console.log("Comments", commentsResponse);
    };

    console.log("In comments file", typeof updateComments)

    return (
        <div>
            {commentsState?.length !== 0 &&
                commentsState?.map((comment: any) => {
                    return <CommentSection key={comment.id} comment={comment} updateComments={updateComments} />;
                })}
        </div>
    );
}

export default Comments;
