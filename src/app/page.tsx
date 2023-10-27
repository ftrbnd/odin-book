import { Post } from '@/components/Post';
import { CreatePost } from '@/components/CreatePost';
import { api } from '@/trpc/server';

export default async function Home() {
  const posts = await api.post.getPosts.query();

  return (
    <main className="flex flex-col gap-4 items-center justify-center p-8 w-full md:w-3/5 lg:w-2/5">
      <CreatePost />
      {posts.map((post) => (
        <Post key={post.id} post={post} user={post.createdBy} comments={post.comments} likes={post.likes} />
      ))}
    </main>
  );
}
