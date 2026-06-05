import { View, ActivityIndicator } from 'react-native'
// Hooks
import { useTheme } from '@/theme'
import { useStyles } from '@/shared/hooks/useStyles'
// Styles
import { makeStyles } from './LoadingState.styles'

export function LoadingState() {
  const theme  = useTheme()
  const styles = useStyles(makeStyles)

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.primary} />
    </View>
  )
}