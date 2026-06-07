// Hooks
import { useAuthStore } from "@/store/authStore";
// Components
import { Layout } from "@/layout/Layout";
import { PrivateProfile } from "./PrivateProfile";
import { PublicProfile } from "./PublicProfile";
// Types
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AppStackParams } from "@/navigation/navigation.types";

type ProfileScreenProps = NativeStackScreenProps<AppStackParams, "Profile">;

export function Profile({ route }: ProfileScreenProps) {
  const myUsername = useAuthStore((state) => state.user?.username);
  const username = route.params?.username;

  const isOwn = !username || username === myUsername;

  return (
    <Layout>
      {isOwn ? <PrivateProfile /> : <PublicProfile username={username!} />}
    </Layout>
  );
}
