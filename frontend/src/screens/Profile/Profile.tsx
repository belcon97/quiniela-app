import { useRoute } from "@react-navigation/native";
// Components
import { Layout } from "@/layout/Layout";
import { PrivateProfile } from "@/features/profile/components/PrivateProfile/PrivateProfile";
import { PublicProfile } from "@/features/profile/components/PublicProfile/PublicProfile";
// Types
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AppStackParams } from "@/navigation/navigation.types";

type ProfileRoute = NativeStackScreenProps<AppStackParams, "Profile">["route"];

export function Profile() {
  const route = useRoute<ProfileRoute>();
  const username = route.params?.username;

  return (
    <Layout>
      {username ? <PublicProfile username={username} /> : <PrivateProfile />}
    </Layout>
  );
}