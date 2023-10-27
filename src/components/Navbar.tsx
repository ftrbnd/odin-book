import { cn } from '@/lib/utils';
import { ModeToggle } from './ui/mode-toggle';
import { getServerAuthSession } from '@/server/auth';
import { SessionNavItems } from './SessionNavItems';

export async function Navbar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const session = await getServerAuthSession();

  return (
    <nav className={cn('flex p-2 bg-primary justify-between space-x-4 lg:space-x-6', className)} {...props}>
      <h1 className="text-primary-foreground text-2xl font-bold">odinbook</h1>
      <ul className="flex gap-2 items-center">
        <li>
          <ModeToggle />
        </li>
        {session && <SessionNavItems />}
      </ul>
    </nav>
  );
}
