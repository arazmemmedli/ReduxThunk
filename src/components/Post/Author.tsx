import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectAllUsers } from '../../redux/reducers/users/userSlice';

export const Author = ({ userId }: { userId: number }) => {
    const users = useAppSelector(selectAllUsers)

    const author = users.find(user => user.id === userId);

    return <span className='mr-2'>by {author ? author.name : 'Unknown author'}</span>
}

export default Author;