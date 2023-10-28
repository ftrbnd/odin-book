import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { PostActionRow } from './PostActionRow';
import { PostTitle } from './PostTitle';
import { type RouterOutputs } from '@/trpc/shared';

export function Post({ post }: { post: RouterOutputs['post']['getAll'][0] }) {
  const getTimestamp = () => {
    const date = post.createdAt;
    const today = new Date();

    if (date.getUTCFullYear() === today.getUTCFullYear() && date.getUTCMonth() === today.getUTCMonth() && date.getUTCDate() === today.getUTCDate()) {
      // same day
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    if (date.getUTCFullYear() === today.getUTCFullYear()) {
      return date.toLocaleDateString([], { day: '2-digit', month: 'long' });
    }
    if (date.getUTCFullYear() < today.getUTCFullYear()) {
      const yearDiff = today.getFullYear() - date.getUTCFullYear();
      return yearDiff === 1 ? `Last year` : `${yearDiff} years ago`;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <PostTitle user={post.createdBy} />
        <CardDescription className="text-sm">{getTimestamp()}</CardDescription>
      </CardHeader>
      <CardContent>
        {post.image && <Image src={post.image} alt="Post content" height={50} width={50} />}
        <p>{post.text}</p>
      </CardContent>
      <CardFooter>
        <PostActionRow post={post} />
      </CardFooter>
    </Card>
  );
}
