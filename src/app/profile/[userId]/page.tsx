import { Post } from '@/components/Post';
import { ProfileCard } from '@/components/ProfileCard';
import { api } from '@/trpc/server';

export default async function UserPage({ params }: { params: { userId: string } }) {
  const user = await api.user.getById.query(params.userId);

  if (!user) return null;
  return (
    <main className="flex flex-col gap-4 items-center justify-center p-8 w-full md:w-3/5 lg:w-2/5">
      <ProfileCard user={user} />
      {user.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </main>
  );
}
