import { Post } from '@/components/Post';
import { SuggestedUser } from '@/components/SuggestedUser';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getServerAuthSession } from '@/server/auth';
import { api } from '@/trpc/server';

export default async function ExplorePage() {
  const session = await getServerAuthSession();
  const allUsers = await api.user.getAll.query();
  const suggestedPosts = await api.post.getSuggested.query();

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-4xl font-bold">Explore</h2>
      <div className="flex flex-col gap-2 md:grid md:grid-cols-2">
        <Card className="h-min">
          <CardHeader>
            <CardTitle>Suggested Friends</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {allUsers.map((user) => user.id !== session?.user.id && !user.followedBy.some((f) => f.id === session?.user.id) && <SuggestedUser key={user.id} user={user} />)}
            <p className="text-sm">No more users to show.</p>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-2">
          {suggestedPosts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
