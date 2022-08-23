import React from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { IPost } from '../../types/types';
import { FaThumbsUp } from "react-icons/fa"
import { AiFillHeart, AiFillLike } from 'react-icons/ai';
import { reactionAdded } from '../../redux/reducers/post/postSlice';

export const ReactionButton = ({ post }: { post: IPost }) => {
    const dispatch = useAppDispatch();
    return (
        <div className='flex items-center space-x-4'>
            <button
                type="button"
                className="flex items-center space-x-2"
                onClick={() => {
                    dispatch(reactionAdded({ postId: post.id, reaction: "heart" }))
                }}
            >
                <AiFillHeart className='text-2xl text-red-500' /><span>{post.reactions?.heart}</span>
            </button>
            <button
                type="button"
                className="flex items-center space-x-2"
                onClick={() => {
                    dispatch(reactionAdded({ postId: post.id, reaction: "thumbsUp" }))
                }}
            >
                <AiFillLike className='text-2xl' /><span>{post.reactions?.thumbsUp}</span>
            </button>
        </div >
    )
}
