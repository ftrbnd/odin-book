'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';

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
          <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}
