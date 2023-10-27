'use client';

import { type Comment, type Like, type Post } from '@prisma/client';
import { Button } from './ui/button';
import { FaThumbsUp, FaComment } from 'react-icons/fa';

export function PostActionRow({ post, comments, likes }: { post: Post; comments: Comment[]; likes: Like[] }) {
  const sendComment = () => {
    // TODO: implement comments
    console.log('Sending comment...');
  };

  const sendLike = () => {
    // TODO: implement likes
    console.log('Sending like...');
  };

  return (
    <div className="flex gap-2">
      <Button variant={'outline'} onClick={sendComment}>
        <FaComment className="mr-2 h-4 w-4" />
        {comments.length ?? 0}
      </Button>
      <Button onClick={sendLike}>
        <FaThumbsUp className="mr-2 h-4 w-4" />
        {likes.length ?? 0}
      </Button>
    </div>
  );
}
