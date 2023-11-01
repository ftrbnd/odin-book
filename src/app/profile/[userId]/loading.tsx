import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function LoadingUserPage() {
  return (
    <main className="flex flex-col gap-4 items-center justify-center p-8 w-full md:w-3/5 lg:w-2/5">
      <Card className="w-full">
        <CardHeader className="flex items-center">
          <Avatar className="w-49 h-49">
            <AvatarImage src={'/default.png'} />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <CardTitle className="font-bold text-5xl flex justify-center gap-2 items-center">...</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center gap-2">
          <p>0 friends</p>
        </CardContent>
      </Card>
    </main>
  );
}
