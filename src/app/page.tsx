import SignOutButton from "@/components/SignOutButton";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1>{hello ? hello.greeting : "Loading tRPC query..."}</h1>
      <h2>{session && `You are signed in as ${session.user.name}`}</h2>
      <ModeToggle />
      <SignOutButton />
    </main>)
}