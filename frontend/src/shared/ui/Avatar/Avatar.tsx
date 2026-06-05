import { View, Text, Image } from "react-native";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
// Utils
import { getInitials } from "@/shared/utils/getInitials";
// Styles
import { makeStyles } from "./Avatar.styles";

type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps {
  name: string;
  size?: AvatarSize;
  imageUrl?: string;
}

export function Avatar({ name, size = "md", imageUrl }: AvatarProps) {
  const styles = useStyles(makeStyles);

  return (
    <View style={[styles.container, styles[size]]}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          accessibilityLabel={name}
        />
      ) : (
        <Text style={styles[`initials_${size}`]}>{getInitials(name)}</Text>
      )}
    </View>
  );
}
