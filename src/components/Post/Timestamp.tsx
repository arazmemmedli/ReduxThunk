import React from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';

export const Timestamp = ({ timestamp }: { timestamp: any }) => {
    let timeAgo:string = ''
    if (timestamp) {
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }
    return (
        <span className='italic'>{timeAgo}</span>
    )
}
