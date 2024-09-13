'use client'

import PostActionBar from '@/components/shared/PostActionBar'
import { useEffect, useRef, useState } from 'react'
import Comments from './shared/post/Comments'
import { EmojiActionInterface, ReactionSummary } from '@/utils/interfaces/card'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '@/store/Slices/postSlice'
import { PostsInterfaceStore } from '@/utils/interfaces/posts'

const CommentsLogic = ({
    postId,
    commentResult,
    paginationResult,
    user_reaction,
    reaction_summary,
    getPostCommets,
    reactionSummary,
    setReactionSummary,
}: any) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [disableReactionButton, setDisableReactionButton] =
        useState<boolean>(false)
    const [userReaction, setUserReaction] = useState('')
    const storePosts = useSelector(
        (state: PostsInterfaceStore) => state.posts.posts,
    )
    const dispatch = useDispatch()

    const updateReactionArray = (
        reactionArray: ReactionSummary,
        reactionObject: EmojiActionInterface,
    ) => {
        if (reactionObject.action === 'post') {
            incrementReactionCount(
                `${reactionObject.value}_count`,
                reactionObject.value,
            )
        } else if (reactionObject.action === 'update') {
            updateReactions(
                `${reactionObject.value}_count`,
                `${reactionObject.previousAction}_count`,
                reactionObject.value,
            )
        } else if (reactionObject.action === 'delete') {
            deleteReaction(`${reactionObject.value}_count`, reactionObject.value)
        }
    }

    const updateReactions = (
        increment: string,
        decrement: string,
        value: string,
    ) => {
        setReactionSummary({
            ...reactionSummary,
            [increment]: reactionSummary[increment as keyof ReactionSummary] + 1,
            [decrement]: reactionSummary[decrement as keyof ReactionSummary] - 1,
        })

        dispatch(
            setPosts(
                storePosts.map((post: any) => {
                    if (post.id === Number(postId)) {
                        return {
                            ...post,
                            reaction_summary: {
                                ...post.reaction_summary,
                                [increment]:
                                    reactionSummary[increment as keyof ReactionSummary] + 1,
                                [decrement]:
                                    reactionSummary[decrement as keyof ReactionSummary] - 1,
                            },
                            user_reaction: value,
                        }
                    }
                    return post
                }),
            ),
        )
    }

    const incrementReactionCount = (increment: string, value: string) => {
        setReactionSummary({
            ...reactionSummary,
            [increment]: reactionSummary[increment as keyof ReactionSummary] + 1,
        })
        dispatch(
            setPosts(
                storePosts.map((post: any) => {
                    if (post.id === Number(postId)) {
                        return {
                            ...post,
                            reaction_summary: {
                                ...post.reaction_summary,
                                [increment]:
                                    reactionSummary[increment as keyof ReactionSummary] + 1,
                            },
                            user_reaction: value,
                        }
                    }
                    return post
                }),
            ),
        )
    }
    const deleteReaction = (decrement: string, value: string) => {
        setReactionSummary({
            ...reactionSummary,
            [decrement]: reactionSummary[decrement as keyof ReactionSummary] - 1,
        })

        dispatch(
            setPosts(
                storePosts.map((post: any) => {
                    if (post.id === Number(postId)) {
                        return {
                            ...post,
                            reaction_summary: {
                                ...post.reaction_summary,
                                [decrement]:
                                    reactionSummary[decrement as keyof ReactionSummary] - 1,
                            },
                            user_reaction: value,
                        }
                    }
                    return post
                }),
            ),
        )
    }

    useEffect(() => {
        setUserReaction(user_reaction)
    }, [user_reaction])

    useEffect(() => {
        if (reaction_summary) {
            setReactionSummary(reaction_summary)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reaction_summary])

    return (
        <div className="flex flex-col gap-[20px]">
            <PostActionBar
                postId={postId}
                inputRef={inputRef}
                userReaction={userReaction}
                setUserReaction={setUserReaction}
                updateReactionArray={updateReactionArray}
                reactionSummary={reactionSummary}
                disableReactionButton={disableReactionButton}
                setDisableReactionButton={setDisableReactionButton}
                userComment={{ id: '' }}
                updatePosts={() => { }}
                posts={[]}
                totalComments={0}
            />
            <Comments
                postId={postId}
                initialComments={commentResult}
                pagination={paginationResult}
                inputRef={inputRef}
                getPostCommets={getPostCommets}
            />
        </div>
    )
}

export default CommentsLogic