import React from 'react'
import { Pressable, Text } from 'react-native'
import { useStyles } from '@/shared/hooks/useStyles'
import { makeStyles } from './Chip.styles'

interface ChipProps {
  children:  React.ReactNode
  isActive?: boolean
  onPress?:  () => void
}

export function Chip({
  children,
  isActive = false,
  onPress,
}: ChipProps) {
  const styles = useStyles(makeStyles)

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        isActive && styles.chip_active,
        pressed && { opacity: 0.8 },
      ]}
    >
      {/* Label */}
      <Text style={[styles.label, isActive && styles.label_active]}>
        {children}
      </Text>
    </Pressable>
  )
}