'use client'
import { useState } from 'react'
import TextArea from './ui/TextArea';
import { useParams } from 'next/navigation';
import ReplyTextArea from './shared/ReplyTextArea';
import { postComment, postCommentReply } from '@/services/posts'


function CommentOrReply({ reply = false, commentId = null, updateComments }: any) {
    const params = useParams()
    const postId = params['id']


    const [isLoading, setIsLoading] = useState({
        loading: false,
        status: 'null'
    })

    const handleTextArea = async (value: any) => {
        console.log("In handletextare file start", typeof updateComments)
        try {


            setIsLoading({ ...isLoading, loading: true })
            const result = reply ? await postCommentReply({ commentId, content: { 'content': value } }) : await postComment({ postId, content: { 'content': value } })
            // setIsLoading(false)

            console.log("Success on line 27")

            if (result.success) {

                console.log("In comments    orreply file", typeof updateComments)
                // Here its saying that updateComments is undefined
                // Here its saying that updateComments is undefined 
                updateComments()
            }

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