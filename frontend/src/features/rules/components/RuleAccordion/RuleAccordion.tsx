import { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
// Hooks
import { useTheme } from '@/theme'
import { useStyles } from '@/shared/hooks/useStyles'
// Types
import type { RuleAccordionItem } from '@/features/rules/types/rules.types'
// Styles
import { makeStyles } from './RuleAccordion.styles'

interface RuleAccordionProps {
  item: RuleAccordionItem
}

export function RuleAccordion({ item }: RuleAccordionProps) {
  const theme  = useTheme()
  const styles = useStyles(makeStyles)

  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <View style={styles.container}>

      {/* Header */}
      <Pressable
        style={styles.header}
        onPress={() => setIsExpanded(prev => !prev)}
      >
        {/* Icon */}
        <View style={styles.iconWrapper}>
          <Feather
            name={item.icon}
            size={20}
            color={theme.textSecondary}
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>{item.title}</Text>

        {/* Chevron */}
        <Feather
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={theme.textSecondary}
        />

      </Pressable>

      {/* Description */}
      {isExpanded && (
        <Text style={styles.description}>{item.description}</Text>
      )}

    </View>
  )
}