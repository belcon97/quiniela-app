import { View, Text, ImageBackground } from 'react-native'
import { useStyles } from '@/shared/hooks/useStyles'
import { makeStyles } from './ScreenHeader.styles'

const DEFAULT_BG = require('../../../../assets/images/bg-auth.webp')

interface ScreenHeaderProps {
  title:     string
  subtitle?: string
  bgImage?:  string
}

export function ScreenHeader({
  title,
  subtitle,
  bgImage,
}: ScreenHeaderProps) {
  const styles = useStyles(makeStyles)

  const source = bgImage ? { uri: bgImage } : DEFAULT_BG

  return (
    <ImageBackground
      source={source}
      style={styles.container}
      imageStyle={styles.container}
      resizeMode="cover"
    >
      {/* Overlay */}
      <View style={styles.overlay} />

      {/* Content */}
      <View style={styles.bg}>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Subtitle */}
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}

      </View>

    </ImageBackground>
  )
}