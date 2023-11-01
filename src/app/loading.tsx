import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function LoadingHomePage() {
  return (
    <main className="flex flex-col gap-4 items-center justify-center p-8 w-full md:w-3/5 lg:w-2/5">
      <Card className="w-full">
        <Tabs defaultValue="status">
          <CardHeader>
            <TabsList>
              <TabsTrigger value="status" className="w-full">
                Status
              </TabsTrigger>
              <TabsTrigger value="photo" className="w-full">
                Photo
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <TabsContent value="status">
            <CardContent>
              <Textarea className="resize-none" placeholder="What's on your mind?" />
            </CardContent>
            <CardFooter className="justify-end">
              <Button disabled>Post</Button>
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
    </main>
  );
}
