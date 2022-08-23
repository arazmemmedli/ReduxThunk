import React from 'react'
import { Link } from 'react-router-dom'
import { IPost } from '../../types/types'
import Author from './Author'
import { ReactionButton } from './ReactionButton'
import { Timestamp } from './Timestamp'

const PostItem = ({ post }: { post: IPost }) => {
    return (
        <article className="rounded-xl border border-solid border-[#000] m-[0.5em] p-[1em]">
            <h2 className='mb-4 text-2xl font-semibold'>{post.title}</h2>
            <p className='leading-snug text-lg my-[0.5em] font-medium mb-3'>{post.body.substring(0, 100)}...</p>
            <p className="text-base mb-4">
                <Link to={`/post/${post.id}`} className="mr-2 text-black underline">View Post</Link>
                <Author userId={post.userId || 0} />
                <Timestamp timestamp={post.date} />
            </p>
            <ReactionButton post={post} />
        </article>
    )
}

export default PostItem;