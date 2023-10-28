import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { PostActionRow } from './PostActionRow';
import { PostTitle } from './PostTitle';
import { type RouterOutputs } from '@/trpc/shared';

export function Post({ post }: { post: RouterOutputs['post']['getAll'][0] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <PostTitle user={post.createdBy} />
        <CardDescription className="text-sm">{post.createdAt.toLocaleDateString()}</CardDescription>
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
