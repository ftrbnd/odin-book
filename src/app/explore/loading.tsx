import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingExplorePage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-4xl font-bold">Explore</h2>
      <div className="flex flex-col gap-2 md:grid md:grid-cols-2">
        <Card className="h-min">
          <CardHeader>
            <CardTitle>Suggested Friends</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Skeleton className="h-10" />
          </CardContent>
        </Card>
        <div className="flex flex-col gap-2">
          <Card className="h-min">
            <CardHeader>
              <CardTitle>Suggested Posts</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Skeleton className="h-10" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
