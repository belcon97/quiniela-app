import { View, Image, Text } from 'react-native'
import { useStyles } from '@/shared/hooks/useStyles'
import { makeStyles } from './Flag.styles'

type FlagSize = 'sm' | 'md' | 'lg'

interface FlagProps {
  uri:   string
  name:  string
  size?: FlagSize
}

export function Flag({ uri, name, size = 'md' }: FlagProps) {
  const styles = useStyles(makeStyles)

  return (
    <View style={[styles.flag, styles[size]]}>

      {uri ? (
        /* Flag */
        <Image
          source={{ uri }}
          style={styles.image}
          accessibilityLabel={name}
        />
      ) : (
        /* Fallback — iniciales del pais */
        <View style={styles.fallback}>
          <Text style={styles.fallbackText}>
            {name.slice(0, 2).toUpperCase()}
          </Text>
        </View>
      )}

    </View>
  )
}