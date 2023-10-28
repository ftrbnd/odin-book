import { Post } from '@/components/Post';
import { ProfileActionRow } from '@/components/ProfileActionRow';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/trpc/server';

export default async function UserPage({ params }: { params: { userId: string } }) {
  const user = await api.user.getById.query(params.userId);

  if (!user) return null;
  return (
    <main className="flex flex-col gap-4 items-center justify-center p-8 w-full md:w-3/5 lg:w-2/5">
      <Card className="w-full">
        <CardHeader className="flex items-center">
          <Avatar className="w-49 h-49">
            <AvatarImage src={user.image ?? 'https://github.com/shadcn.png'} />
            <AvatarFallback>{user.name?.at(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="font-bold text-5xl flex justify-center gap-2 items-center">{user.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center gap-2">
          <p>{user.followedBy.length ?? 0} followers</p>
          <p>•</p>
          <p>{user.following.length ?? 0} following</p>
        </CardContent>
        <ProfileActionRow profileUser={user} />
      </Card>
      {user.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </main>
  );
}
