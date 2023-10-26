import SignInButton from "@/components/SignInButton";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
    const session = await getServerAuthSession();

    if (session) redirect('/')

    return <div>
        <h2>You are not signed in</h2>
        <SignInButton />
    </div>
}