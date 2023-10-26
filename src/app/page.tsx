import SignOutButton from "@/components/SignOutButton";
import { CreatePost } from "@/components/create-post";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h2>{session && `You are signed in as ${session.user.name}`}</h2>
      <ModeToggle />
      <SignOutButton />
      <CreatePost />
    </main>)
}