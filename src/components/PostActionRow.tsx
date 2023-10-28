'use client';

import { Button } from './ui/button';
import { FaThumbsUp, FaComment } from 'react-icons/fa';
import { api } from '@/trpc/react';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { type FormEvent, useState } from 'react';
import { toast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { type RouterOutputs } from '@/trpc/shared';

export function PostActionRow({ post }: { post: RouterOutputs['post']['getAll'][0] }) {
  const [comment, setComment] = useState('');

  const router = useRouter();

  const createComment = api.comment.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setComment('');
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to submit your comment.',
        action: <ToastAction altText="Try again">Try again</ToastAction>
      });
    }
  });

  const sendComment = (e: FormEvent) => {
    e.preventDefault();
    createComment.mutate({ text: comment, postId: post.id });
  };

  const sendLike = () => {
    // TODO: implement likes
    console.log('Sending like...');
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex gap-2 justify-end">
        <Button variant={'ghost'}>
          <FaComment className="mr-2 h-4 w-4" />
          {post.comments.length ?? 0}
        </Button>
        <Button variant={'outline'} onClick={sendLike}>
          <FaThumbsUp className="mr-2 h-4 w-4" />
          {post.likes.length ?? 0}
        </Button>
      </div>
      <form onSubmit={(e) => sendComment(e)} className="flex w-full items-center space-x-2">
        <Input type="text" placeholder="Leave a comment" value={comment} onChange={(e) => setComment(e.target.value)} />
        <Button type="submit" disabled={comment.trim() === '' || createComment.isLoading} variant={'secondary'} onClick={(e) => sendComment(e)}>
          Send
        </Button>
      </form>
      {post.comments.length > 0 && (
        <ScrollArea className="h-[100px] w-full rounded-md border p-4 bg-secondary">
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex gap-2 my-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={comment.createdBy.image ?? 'https://github.com/shadcn.png'} />
                <AvatarFallback>{comment.createdBy.name?.at(0)}</AvatarFallback>
              </Avatar>
              <p className="font-bold">{comment.createdBy.name}</p>
              <p>{comment.text}</p>
            </div>
          ))}
          <ScrollBar />
        </ScrollArea>
      )}
    </div>
  );
}
