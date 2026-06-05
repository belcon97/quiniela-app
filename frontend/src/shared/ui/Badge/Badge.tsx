import React from 'react'
import { View, Text } from 'react-native'
import { useStyles } from '@/shared/hooks/useStyles'
import type { BadgeVariant } from '@/shared/types'
import { makeStyles } from './Badge.styles'

interface BadgeProps {
  children:  React.ReactNode
  variant:   BadgeVariant
}

export function Badge({ children, variant }: BadgeProps) {
  const styles = useStyles(makeStyles)

  return (
    <View style={[styles.badge, styles[variant]]}>

      {/* Pulse */}
      {variant === 'live' && <View style={styles.pulse} />}

      {/* Label */}
      <Text style={[styles.label, styles[`label_${variant}`]]}>
        {children}
      </Text>

    </View>
  )
}