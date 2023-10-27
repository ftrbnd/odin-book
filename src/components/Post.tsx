import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type User, type Post, type Comment, type Like } from '@prisma/client';
import Image from 'next/image';
import { PostActionRow } from './PostActionRow';

export function Post({ post, user, comments, likes }: { post: Post; user: User; comments: Comment[]; likes: Like[] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-bold text-xl flex gap-2 items-center">
          <Avatar>
            <AvatarImage src={user.image ?? 'https://github.com/shadcn.png'} />
            <AvatarFallback>{user.name?.at(0)}</AvatarFallback>
          </Avatar>
          {user.name}
        </CardTitle>
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
