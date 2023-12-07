'use client'
import { useState } from 'react'
import TextArea from './ui/TextArea';
import { useParams } from 'next/navigation';
import ReplyTextArea from './shared/ReplyTextArea';
import { postComment, postCommentReply } from '@/services/posts'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import {useRouter} from 'next/navigation'

function CommentOrReply({ reply = false, commentId = null }: any) {
    const params = useParams()
    const postId = params['id']
    const router = useRouter()

    const [isLoading, setIsLoading] = useState({
        loading: false,
        status: 'null'
    })

    const handleTextArea = async (value: any) => {

        try {


            setIsLoading({ ...isLoading, loading: true })
            const result = reply ? await postCommentReply({ commentId, content: { 'content': value } }) : await postComment({ postId, content: { 'content': value } })
            // setIsLoading(false)
            
            // TODO--> there is no success field in response of postCommentReply

            console.log("Here is result 28", result)
            const status = result.success ? 'success' : 'error'

            setIsLoading({ ...isLoading, loading: false, status: status })
            console.log("Result 21", result)

        } catch (err) {
            console.log(err)
        }
        
    }
    return (
        <div>
            {reply ? <ReplyTextArea handleTextArea={handleTextArea} isLoading={isLoading} /> : <TextArea handleTextArea={handleTextArea} isLoading={isLoading} />}
        </div>
    );
}

export default CommentOrReply