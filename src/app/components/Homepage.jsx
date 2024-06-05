import { useSession, signIn, signOut } from "next-auth/react";

function Homepage() {
    const { data: session, status: loading } = useSession();

    if (loading === "loading") {
        return <div>Loading...</div>;
    }

    if (session) {
        return (
            <div>
                Signed in as {session.user.email}
                <button onClick={() => signOut()}>Sign Out</button>
            </div>
        );
    }

    return (
        <div>
            Not signed in
            <button onClick={() => signIn()}>Login</button>
        </div>
    );
}

export default Homepage;