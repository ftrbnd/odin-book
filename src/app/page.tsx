import { Post } from '@/components/Post';
import { SignOutButton } from '@/components/SignOutButton';
import { api } from '@/trpc/server';

export default async function Home() {
  const posts = await api.post.getPosts.query();

  return (
    <main className="flex flex-col items-center justify-center px-8">
      <SignOutButton />
      {posts.map((post) => (
        <Post key={post.id} post={post} user={post.createdBy} comments={post.comments} likes={post.likes} />
      ))}
    </main>
  );
}
