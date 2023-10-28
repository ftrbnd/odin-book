'use client';

import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { FaUserEdit, FaUserPlus, FaUserMinus } from 'react-icons/fa';
import { CardFooter } from './ui/card';
import { type RouterOutputs } from '@/trpc/shared';

export function ProfileActionRow({ profileUser }: { profileUser: RouterOutputs['user']['getById'] }) {
  const { data: session } = useSession();

  const toggleFriend = () => {
    // TODO: Implement friend requests
  };

  return (
    <CardFooter className="justify-end">
      {session?.user.id !== profileUser?.id ? (
        <Button>
          <FaUserPlus className="mr-2 h-4 w-4" />
          Add Friend
        </Button>
      ) : (
        <Button>
          <FaUserEdit className="mr-2 h-4 w-4" />
          {/* TODO: Implement edit profile */}
          Edit
        </Button>
      )}
    </CardFooter>
  );
}
