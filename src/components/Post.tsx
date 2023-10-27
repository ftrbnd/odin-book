import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { type User, type Post, type Comment, type Like } from '@prisma/client';
import Image from 'next/image';
import { PostActionRow } from './PostActionRow';
import { PostTitle } from './PostTitle';

export function Post({ post, user, comments, likes }: { post: Post; user: User; comments: Comment[]; likes: Like[] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <PostTitle user={user} />
        <CardDescription className="text-sm">{post.createdAt.toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent>
        {post.image && <Image src={post.image} alt="Post content" height={50} width={50} />}
        <p>{post.text}</p>
      </CardContent>
      <CardFooter className="justify-end">
        <PostActionRow post={post} comments={comments} likes={likes} />
      </CardFooter>
    </Card>
  );
}
