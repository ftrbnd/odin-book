import { Post } from '@/components/Post';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getServerAuthSession } from '@/server/auth';
import { api } from '@/trpc/server';
import { FaUserEdit, FaUserPlus } from 'react-icons/fa';

export default async function UserPage({ params }: { params: { userId: string } }) {
  const user = await api.user.getById.query(params.userId);
  const session = await getServerAuthSession();

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
        <CardFooter className="justify-end">
          {session?.user.id !== user.id ? (
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
      </Card>
      {user.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </main>
  );
}
