'use client';

import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { FaUserEdit, FaUserPlus, FaUserMinus, FaUserClock, FaSave, FaTimes } from 'react-icons/fa';
import { CardContent, CardFooter } from './ui/card';
import { type RouterOutputs } from '@/trpc/shared';
import { api } from '@/trpc/react';
import { useRouter } from 'next/navigation';
import { toast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import { useState } from 'react';
import { Input } from './ui/input';

type FriendStatus = 'FRIENDS' | 'REQUEST_SENT' | 'NOT_FRIENDS';

interface Props {
  profileUser: RouterOutputs['user']['getById'];
}

export function ProfileActionRow({ profileUser }: Props) {
  const [editing, setEditing] = useState(false);
  const [newBio, setNewBio] = useState('');

  const { data: session } = useSession();
  const router = useRouter();

  const editBio = api.user.editBio.useMutation({
    onSuccess: () => {
      router.refresh();
      setEditing(false);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to edit your bio.',
        action: <ToastAction altText="Try again">Try again</ToastAction>
      });
    }
  });

  const toggleFriend = api.user.toggleFriend.useMutation({
    onSuccess: () => {
      setEditing(false);
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

    return `${overlappingUsers?.length ?? 0} ${overlappingUsers?.length === 1 ? 'friend' : 'friends'}`;
  };

  return (
    <>
      <CardContent className="flex flex-col items-center justify-center gap-2">
        {editing ? <Input type="text" placeholder="Bio" value={newBio} onChange={(e) => setNewBio(e.target.value)} /> : <p>{profileUser?.bio}</p>}
        <p className="font-semibold">{getFriendCount()}</p>
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
        ) : editing ? (
          <div className="flex gap-2">
            <Button
              variant={'destructive'}
              onClick={() => {
                setEditing(false);
                setNewBio('');
              }}
            >
              <FaTimes className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (newBio && newBio !== profileUser?.bio) editBio.mutate({ newBio });
                setEditing(false);
              }}
              disabled={editBio.isLoading}
            >
              <FaSave className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        ) : (
          <Button onClick={() => setEditing(true)}>
            <FaUserEdit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        )}
      </CardFooter>
    </>
  );
}
