import { cn } from '@/lib/utils';
import { ModeToggle } from './ui/mode-toggle';

export function Navbar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn('flex p-2 bg-primary justify-between space-x-4 lg:space-x-6', className)} {...props}>
      <h1 className="text-primary-foreground text-2xl font-bold">odinbook</h1>
      <ModeToggle />
    </nav>
  );
}
