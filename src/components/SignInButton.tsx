'use client';

import { signIn } from 'next-auth/react';
import { Button } from './ui/button';
import { FaGoogle } from 'react-icons/fa';

export default function SignInButton() {
  return (
    <Button onClick={() => signIn('google')}>
      <FaGoogle className="mr-2 h-4 w-4" />
      Sign In
    </Button>
  );
}
