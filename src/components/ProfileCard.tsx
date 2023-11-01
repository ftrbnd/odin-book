import { type RouterOutputs } from '@/trpc/shared';
import { Card, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { ProfileActionRow } from './ProfileActionRow';

export function ProfileCard({ user }: { user: RouterOutputs['user']['getById'] }) {
  return (
    <Card className="w-full">
      <CardHeader className="flex items-center">
        <Avatar className="w-49 h-49">
          <AvatarImage src={user?.image ?? 'https://github.com/shadcn.png'} />
          <AvatarFallback>{user?.name?.at(0)}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-center font-bold text-5xl flex justify-center gap-2 items-center">{user?.name}</CardTitle>
      </CardHeader>
      <ProfileActionRow profileUser={user} />
    </Card>
  );
}
