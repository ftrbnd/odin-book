import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingExplorePage() {
  return (
    <div className="flex flex-col gap-4 p-4 w-full md:w-3/5 lg:w-2/5">
      <h2 className="text-4xl font-bold">Explore</h2>
      <div className="flex flex-col gap-2 md:grid md:grid-cols-2 w-full">
        <Card className="h-min w-full">
          <CardHeader>
            <CardTitle>Suggested Friends</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Skeleton className="h-10" />
          </CardContent>
        </Card>
        <Card className="h-min w-full">
          <CardHeader>
            <CardTitle>Suggested Posts</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Skeleton className="h-10" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
