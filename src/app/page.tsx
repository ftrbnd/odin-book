import { Post } from '@/components/Post';
import { CreatePost } from '@/components/CreatePost';
import { api } from '@/trpc/server';
import { Friends } from '@/components/Friends';

export default async function Home() {
  const posts = await api.post.getAll.query();
  const user = await api.user.me.query();

  return (
    <main className="flex flex-col gap-4 items-center justify-center p-8">
      <CreatePost />
      <div className="w-full grid grid-cols-3 gap-4">
        <div></div>
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
        <div>
          <Friends user={user} />
        </div>
      </div>
    </main>
  );
}
