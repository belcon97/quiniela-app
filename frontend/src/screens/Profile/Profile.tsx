// Components
import { Layout } from "../../layout/Layout";
import { PrivateProfile } from "../../features/profile/components/PrivateProfile/PrivateProfile";
import { PublicProfile } from "../../features/profile/components/PublicProfile/PublicProfile";

// Types
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AppStackParams } from "../../navigation/navigation.types";

type ProfileScreenProps = NativeStackScreenProps<AppStackParams, "Profile">;

export default function Profile({ route }: ProfileScreenProps) {
  const { username } = route.params || {};

  return (
    <Layout>
      {username ? <PublicProfile username={username} /> : <PrivateProfile />}
    </Layout>
  );
}
