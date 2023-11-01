'use client';

import { api } from '@/trpc/react';
import { type RouterOutputs } from '@/trpc/shared';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';
import { Button } from './ui/button';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast } from './ui/use-toast';
import { ToastAction } from './ui/toast';

export function Friends({ user }: { user: RouterOutputs['user']['me'] }) {
  const { data: myUser } = api.user.me.useQuery(undefined, { initialData: user });
  const router = useRouter();

  const acceptRequest = api.user.acceptRequest.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to accept friend request.',
        action: <ToastAction altText="Try again">Try again</ToastAction>
      });
    }
  });
  const rejectRequest = api.user.rejectRequest.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to reject friend request.',
        action: <ToastAction altText="Try again">Try again</ToastAction>
      });
    }
  });

  const getFriends = () => {
    const friends = myUser?.followedBy.filter((follower) => myUser.following.some((followee) => followee.id === follower.id));

    return friends ?? [];
  };

  const getFriendRequests = () => {
    const friendRequests = myUser?.followedBy.filter((follower) => !myUser.following.some((followee) => followee.id === follower.id));

    return friendRequests ?? [];
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Friends</CardTitle>
      </CardHeader>
      <CardContent>
        {getFriends().length > 0 ? (
          getFriends().map((friend) => (
            <Link href={`/profile/${friend.id}`} key={friend.id}>
              <div className="flex justify-start items-center gap-2 p-2 rounded hover:bg-secondary hover:cursor-pointer">
                <Avatar>
                  <AvatarImage src={friend.image ?? 'https://github.com/shadcn.png'} />
                  <AvatarFallback>{friend.name?.at(0)}</AvatarFallback>
                </Avatar>
                <p className="font-semibold">{friend.name}</p>
              </div>
            </Link>
          ))
        ) : (
          <Button variant={'link'} onClick={() => router.push('/explore')}>
            Add some friends!
          </Button>
        )}
      </CardContent>
      <CardHeader className="pt-0">
        <CardTitle>Friend Requests</CardTitle>
      </CardHeader>
      <CardContent>
        {getFriendRequests().length > 0 ? (
          getFriendRequests().map((request) => (
            <div key={request.id} className="flex items-center">
              <Link href={`/profile/${request.id}`} className="flex-grow">
                <div className="flex justify-start items-center gap-2 p-2 rounded hover:bg-secondary hover:cursor-pointer">
                  <Avatar>
                    <AvatarImage src={request.image ?? 'https://github.com/shadcn.png'} />
                    <AvatarFallback>{request.name?.at(0)}</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold">{request.name}</p>
                </div>
              </Link>
              <div className="flex gap-2">
                <Button onClick={() => acceptRequest.mutate({ userId: request.id })} variant={'outline'} color="cyan">
                  <FaCheck />
                </Button>
                <Button onClick={() => rejectRequest.mutate({ userId: request.id })} variant={'outline'}>
                  <FaTimes />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <Button variant={'ghost'} disabled>
            No new requests.
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
