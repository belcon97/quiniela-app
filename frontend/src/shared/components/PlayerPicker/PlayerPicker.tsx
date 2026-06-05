import { useState } from 'react'
import { View, Text, Pressable, FlatList } from 'react-native'
// Hooks
import { useStyles } from '@/shared/hooks/useStyles'
// Components
import { BottomSheet } from '@/shared/ui/BottomSheet/BottomSheet'
import { Flag } from '@/shared/ui/Flag/Flag'
// Types
import type { TopScorer } from '@/shared/types'
// Styles
import { makeStyles } from './PlayerPicker.styles'

interface PlayerPickerProps {
  visible:       boolean
  title:         string
  subtitle?:     string
  players:       TopScorer[]
  selectedPlayer?: TopScorer | null
  skipLabel?:    string
  confirmLabel?: string
  onClose:       () => void
  onConfirm:     (player: TopScorer) => void
}

export function PlayerPicker({
  visible,
  title,
  subtitle,
  players,
  selectedPlayer = null,
  skipLabel      = 'Omitir por ahora',
  confirmLabel   = 'Guardar',
  onClose,
  onConfirm,
}: PlayerPickerProps) {
  const styles = useStyles(makeStyles)

  const [currentSelection, setCurrentSelection] = useState<TopScorer | null>(selectedPlayer)

  return (
    <BottomSheet visible={visible} title={title} onClose={onClose}>

      {/* Subtitle */}
      {subtitle && (
        <Text style={styles.subtitle}>{subtitle}</Text>
      )}

      {/* List */}
      <FlatList
        data={players}
        keyExtractor={player => player.id}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item: player }) => {
          const isSelected = player.id === currentSelection?.id
          return (
            <Pressable
              style={[styles.row, isSelected && styles.row_selected]}
              onPress={() => setCurrentSelection(player)}
            >
              {/* Flag */}
              <Flag uri={player.flag} name={player.team} size="sm" />

              {/* Info */}
              <View style={styles.info}>
                <Text style={[styles.name, isSelected && styles.name_selected]}>
                  {player.name}
                </Text>
                <Text style={styles.team}>{player.team}</Text>
              </View>

            </Pressable>
          )
        }}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Pressable style={styles.skipBtn} onPress={onClose}>
          <Text style={styles.skipText}>{skipLabel}</Text>
        </Pressable>
        <Pressable
          style={[
            styles.confirmBtn,
            !currentSelection && styles.confirmBtn_disabled,
          ]}
          onPress={() => currentSelection && onConfirm(currentSelection)}
          disabled={!currentSelection}
        >
          <Text style={styles.confirmText}>{confirmLabel}</Text>
        </Pressable>
      </View>

    </BottomSheet>
  )
}