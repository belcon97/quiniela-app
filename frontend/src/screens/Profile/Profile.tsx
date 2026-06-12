// Hooks
import { useAuthStore } from "@/store/authStore";
// Components
import { Layout } from "@/layout/Layout";
import { PrivateProfile } from "./PrivateProfile";
import { PublicProfile } from "./PublicProfile";

interface ProfileProps {
  username?: string;
}

export function Profile({ username }: ProfileProps) {
  const myUsername = useAuthStore((state) => state.user?.username);
  const isOwn = !username || username === myUsername;

  return (
    <Layout>
      {isOwn ? <PrivateProfile /> : <PublicProfile username={username!} />}
    </Layout>
  );
}