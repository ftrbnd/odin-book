'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CardTitle } from './ui/card';
import { type User } from '@prisma/client';
import { useRouter } from 'next/navigation';

export function PostTitle({ user }: { user: User }) {
  const router = useRouter();

  return (
    <CardTitle className="font-bold text-xl flex gap-2 items-center hover:cursor-pointer" onClick={() => router.push(`/profile/${user.id}`)}>
      <Avatar>
        <AvatarImage src={user.image ?? 'https://github.com/shadcn.png'} />
        <AvatarFallback>{user.name?.at(0)}</AvatarFallback>
      </Avatar>
      {user.name}
    </CardTitle>
  );
}
