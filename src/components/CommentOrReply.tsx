'use client'
import { useState } from 'react'
import TextArea from './ui/TextArea';
import { useParams } from 'next/navigation';
import ReplyTextArea from './shared/ReplyTextArea';
import { postComment, postCommentReply } from '@/services/posts'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'

function CommentOrReply({ reply = false, commentId = null }: any) {
    const params = useParams()
    const postId = params['id']

    const handleTextArea = async (value: any) => {
        
        if (reply) {
            try {
                const result = await postCommentReply({ commentId, content: { 'content': value } })
                console.log(result)
                if (result) {
                    showSuccessAlert("Reply Posted");

                } else {
                    showErrorAlert("Error in posting your Reply!");
                }
            } catch (
            err
            ) {
                showErrorAlert(err);
            }
        }
        else {

            try {
                const result = await postComment({ postId, content: { 'content': value } })
                console.log(result)
                if (result.success) {
                    showSuccessAlert("Comment Posted");

                } else {
                    showErrorAlert("Error in posting your comment!");
                }

            } catch (err) {
                showErrorAlert(err);
            }

        }

    }


    return (
        <div>
            {reply ? <ReplyTextArea handleTextArea={handleTextArea} /> : <TextArea handleTextArea={handleTextArea} />}
        </div>
    );
}

export default CommentOrReply