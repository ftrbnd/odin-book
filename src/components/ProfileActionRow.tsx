'use client';

import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { FaUserEdit, FaUserPlus, FaUserMinus, FaUserClock } from 'react-icons/fa';
import { CardContent, CardFooter } from './ui/card';
import { type RouterOutputs } from '@/trpc/shared';
import { api } from '@/trpc/react';
import { useRouter } from 'next/navigation';
import { toast } from './ui/use-toast';
import { ToastAction } from './ui/toast';

type FriendStatus = 'FRIENDS' | 'REQUEST_SENT' | 'NOT_FRIENDS';

export function ProfileActionRow({ profileUser }: { profileUser: RouterOutputs['user']['getById'] }) {
  const { data: session } = useSession();
  const router = useRouter();

  const toggleFriend = api.user.toggleFriend.useMutation({
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

  const getFriendStatus = (): FriendStatus => {
    console.log('profile user: ', profileUser?.followedBy.some((follower) => follower.id === session?.user.id), profileUser?.following.some((follower) => follower.id === session?.user.id));

    if (profileUser?.followedBy.some((follower) => follower.id === session?.user.id) && profileUser.following.some((follower) => follower.id === session?.user.id)) {
      return 'FRIENDS';
    }
    if (profileUser?.followedBy.some((follower) => follower.id === session?.user.id) && !profileUser?.following.some((follower) => follower.id === session?.user.id)) {
      return 'REQUEST_SENT';
    }
    return 'NOT_FRIENDS';
  };

  const getFriendCount = () => {
    const overlappingUsers = profileUser?.followedBy.filter((follower) => profileUser.following.some((followee) => followee.id === follower.id));

    console.log('Overlaps: ', overlappingUsers);

    return `${overlappingUsers?.length ?? 0} ${(overlappingUsers?.length ?? 0) > 1 ? 'friends' : 'friend'}`;
  };

  return (
    <>
      <CardContent className="flex justify-center gap-2">
        <p>{getFriendCount()}</p>
      </CardContent>
      <CardFooter className="justify-end">
        {session?.user.id !== profileUser?.id ? (
          <Button disabled={getFriendStatus() === 'REQUEST_SENT'} onClick={() => toggleFriend.mutate({ userId: profileUser!.id })}>
            {getFriendStatus() === 'FRIENDS' && (
              <>
                <FaUserMinus className="mr-2 h-4 w-4" />
                Remove Friend
              </>
            )}
            {getFriendStatus() === 'NOT_FRIENDS' && (
              <>
                <FaUserPlus className="mr-2 h-4 w-4" />
                Add Friend
              </>
            )}
            {getFriendStatus() === 'REQUEST_SENT' && (
              <>
                <FaUserClock className="mr-2 h-4 w-4" />
                Request Sent
              </>
            )}
          </Button>
        ) : (
          <Button>
            <FaUserEdit className="mr-2 h-4 w-4" />
            {/* TODO: Implement edit profile */}
            Edit
          </Button>
        )}
      </CardFooter>
    </>
  );
}
