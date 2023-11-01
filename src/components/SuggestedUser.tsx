'use client';

import { type RouterOutputs } from '@/trpc/shared';
import Link from 'next/link';
import { FaUserPlus } from 'react-icons/fa';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { api } from '@/trpc/react';
import { useRouter } from 'next/navigation';
import { toast } from './ui/use-toast';
import { ToastAction } from './ui/toast';

export function SuggestedUser({ user }: { user: RouterOutputs['user']['getAll'][0] }) {
  const router = useRouter();

  const sendFriendRequest = api.user.toggleFriend.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to manage friend.',
        action: <ToastAction altText="Try again">Try again</ToastAction>
      });
    }
  });

  return (
    <div className="flex items-center gap-2 p-1">
      <Link href={`/profile/${user.id}`} className="flex-grow">
        <div className="flex justify-start items-center gap-2 p-2 rounded hover:bg-secondary hover:cursor-pointer">
          <Avatar>
            <AvatarImage src={user.image ?? 'https://github.com/shadcn.png'} />
            <AvatarFallback>{user.name?.at(0)}</AvatarFallback>
          </Avatar>
          <p className="font-semibold">{user.name}</p>
        </div>
      </Link>
      <Button onClick={() => sendFriendRequest.mutate({ userId: user.id })} variant={'ghost'}>
        <FaUserPlus />
      </Button>
    </div>
  );
}
