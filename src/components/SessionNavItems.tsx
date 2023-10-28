'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import Link from 'next/link';

export function SessionNavItems() {
  const { data: session } = useSession();

  if (!session) return null;
  return (
    <li>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} size={'icon'}>
            <Avatar>
              <AvatarImage className="rounded-full h-8" src={session.user.image ?? 'https://github.com/shadcn.png'} />
              <AvatarFallback>{session.user.name?.at(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={`/profile/${session.user.id}`}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}
