import type { ComponentProps } from 'react'
import { View, Text, Pressable } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
// Hooks
import { useTheme } from '@/theme'
import { useStyles } from '@/shared/hooks/useStyles'
// Styles
import { makeStyles } from './StateView.styles'

type FeatherIconName = ComponentProps<typeof Feather>['name']

interface StateViewProps {
  icon:      FeatherIconName
  title:     string
  message?:  string
  onRetry?:  () => void
}

export function StateView({
  icon,
  title,
  message,
  onRetry,
}: StateViewProps) {
  const theme  = useTheme()
  const styles = useStyles(makeStyles)

  return (
    <View style={styles.container}>

      {/* Icon */}
      <View style={styles.iconWrapper}>
        <Feather name={icon} size={32} color={theme.textSecondary} />
      </View>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Message */}
      {message && (
        <Text style={styles.message}>{message}</Text>
      )}

      {/* Retry */}
      {onRetry && (
        <Pressable style={styles.retryBtn} onPress={onRetry}>
          <Text style={styles.retryText}>REINTENTAR</Text>
        </Pressable>
      )}

    </View>
  )
}