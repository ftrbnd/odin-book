import { api } from '@/trpc/server';
import { Post } from './Post';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

export async function Posts() {
  const posts = await api.post.getFriendPosts.query();

  return (
    <div className="flex flex-col gap-4">
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <Card className="w-full h-56">
          <CardHeader>
            <CardTitle>No posts to show</CardTitle>
            <CardDescription className="text-sm">Add friends to get started!</CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
