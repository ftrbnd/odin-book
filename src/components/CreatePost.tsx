'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { api } from '@/trpc/react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';

export function CreatePost() {
  const [text, setText] = useState('');

  const router = useRouter();
  const { toast } = useToast();

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setText('');
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to submit your post.',
        action: <ToastAction altText="Try again">Try again</ToastAction>
      });
    }
  });

  return (
    <Card className="w-full">
      <Tabs defaultValue="status">
        <CardHeader>
          <TabsList>
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="photo">Photo</TabsTrigger>
          </TabsList>
        </CardHeader>
        <TabsContent value="status">
          <CardContent>
            <Textarea value={text} onChange={(e) => setText(e.target.value)} className="resize-none" placeholder="What's on your mind?" />
          </CardContent>
          <CardFooter className="justify-end">
            <Button
              onClick={(e) => {
                e.preventDefault();
                createPost.mutate({ text });
              }}
            >
              Post
            </Button>
          </CardFooter>
        </TabsContent>
        <TabsContent value="photo">
          <CardContent>Change your photo here.</CardContent>
          <CardFooter className="justify-end">
            <Button>Upload</Button>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
