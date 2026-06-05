import type { ComponentProps } from 'react'
import { View, Text, Pressable } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
// Hooks
import { useTheme } from '@/theme'
import { useStyles } from '@/shared/hooks/useStyles'
// Styles
import { makeStyles } from './SectionHeader.styles'

type FeatherIconName = ComponentProps<typeof Feather>['name']
interface SectionHeaderProps {
  title:       string
  icon:        FeatherIconName
  onViewMore?: () => void
}

export function SectionHeader({
  title,
  icon,
  onViewMore,
}: SectionHeaderProps) {
  const theme  = useTheme()
  const styles = useStyles(makeStyles)

  return (
    <View style={styles.container}>

      {/* icon + title */}
      <View style={styles.left}>
        <Feather name={icon} size={20} color={theme.textPrimary} />
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Ver mas */}
      {onViewMore && (
        <Pressable onPress={onViewMore}>
          <Text style={styles.viewMore}>Ver más</Text>
        </Pressable>
      )}

    </View>
  )
}