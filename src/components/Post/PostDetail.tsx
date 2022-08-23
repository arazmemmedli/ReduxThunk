import React, { useEffect, useState } from 'react';
import Author from './Author';
import { Timestamp } from './Timestamp';
import { ReactionButton } from './ReactionButton';
import { selectPost } from '../../redux/reducers/post/postSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link, useParams } from 'react-router-dom';

const PostDetail = () => {
    const { id } = useParams();

    const post = useSelector((state: RootState) => selectPost(state, Number(id)));

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }
    return (
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-6 p-2 md:p-6">
                <article className="rounded-xl border border-solid border-[#000] m-[0.5em] p-[1em]">
                    <h2 className='mb-4 text-2xl font-semibold'>{post.title}</h2>
                    <p className='leading-snug text-lg my-[0.5em] font-medium mb-3'>{post.body}</p>
                    <p className="text-base mb-4">
                        <Link to={`/post/edit/${post.id}`} className="mr-2 text-black underline">Edit Post</Link>
                        <Author userId={post.userId || 0} />
                        <Timestamp timestamp={post.date} />
                    </p>
                    <ReactionButton post={post} />
                </article>
            </div>
        </div>
    )
}

export default PostDetail;