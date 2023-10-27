import { SignInButton } from '@/components/SignInButton';
import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { FaSignInAlt } from 'react-icons/fa';

export default async function SignInPage() {
  const session = await getServerAuthSession();

  if (session) redirect('/');

  return (
    <Card className="m-8">
      <CardHeader>
        <CardTitle className="text-primary text-5xl font-bold">Welcome</CardTitle>
        <CardDescription className="text-lg">Connect with friends and the world around you on Odinbook.</CardDescription>
      </CardHeader>
      <CardFooter className="flex-col w-full">
        <SignInButton />
        <Separator className="my-4" orientation="horizontal" />
        <Button variant={'outline'}>
          <FaSignInAlt className="mr-2 h-4 w-4" />
          Guest Account
        </Button>
      </CardFooter>
    </Card>
  );
}
