import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { getPostsError, getPostsStatus, selectAllPost } from '../../redux/reducers/post/postSlice';
import PostItem from './PostItem';

export const Posts = () => {
  const posts = useAppSelector(selectAllPost);
  const postStatus = useAppSelector(getPostsStatus);
  const error = useAppSelector(getPostsError);
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map(post => (
    <PostItem key={post.id} post={post} />
  ))

  let content;
  if (postStatus === 'loading') {
    content = <p>"Loading..."</p>;
  } else if (postStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map(post => <PostItem key={post.id} post={post} />)
  } else if (postStatus === 'failed') {
    content = <p>{error}</p>;
  }


  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {renderedPosts}
      </div>
    </div>
  )
}

export default Posts;