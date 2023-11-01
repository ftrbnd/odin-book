import { CreatePost } from '@/components/CreatePost';
import { api } from '@/trpc/server';
import { Friends } from '@/components/Friends';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Posts } from '@/components/Posts';

export default async function Home() {
  const user = await api.user.me.query();

  return (
    <main className="flex flex-col gap-4 items-center justify-center p-8 w-full">
      <CreatePost />

      <Tabs defaultValue="timeline" className="w-full lg:hidden flex flex-col">
        <TabsList>
          <TabsTrigger value="leftbar">Leftbar</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
        </TabsList>
        <TabsContent value="leftbar">
          <div>LEFT BAR TBD</div>
        </TabsContent>
        <TabsContent value="timeline">
          <div className="flex flex-col gap-4">
            <Posts />
          </div>
        </TabsContent>
        <TabsContent value="friends">
          <Friends user={user} />
        </TabsContent>
      </Tabs>

      <div className="w-full hidden lg:grid lg:grid-cols-3 lg:gap-4 ">
        <div>LEFT BAR TBD</div>
        <div className="flex flex-col gap-4">
          <Posts />
        </div>
        <div>
          <Friends user={user} />
        </div>
      </div>
    </main>
  );
}
