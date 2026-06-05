import { Text, Pressable, FlatList } from 'react-native'
// Hooks
import { useStyles } from '@/shared/hooks/useStyles'
// Components
import { BottomSheet } from '@/shared/ui/BottomSheet/BottomSheet'
// Data
import { WORLD_CUP_PHASES } from '@/data/worldCup2026'
// Styles
import { makeStyles } from './GroupPicker.styles'

interface GroupPickerProps {
  visible:   boolean
  onClose:   () => void
  onSelect:  (group: string) => void
  selected?: string
}

export function GroupPicker({
  visible,
  onClose,
  onSelect,
  selected,
}: GroupPickerProps) {
  const styles = useStyles(makeStyles)

  const handleSelect = (group: string) => {
    onSelect(group)
    onClose()
  }

  return (
    <BottomSheet
      visible={visible}
      title="GRUPO / FASE"
      onClose={onClose}
    >
      <FlatList
        data={WORLD_CUP_PHASES}
        keyExtractor={item => item.value}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isSelected = item.value === selected
          return (
            <Pressable
              style={[styles.row, isSelected && styles.row_selected]}
              onPress={() => handleSelect(item.value)}
            >
              {/* Label */}
              <Text style={[styles.label, isSelected && styles.label_selected]}>
                {item.label}
              </Text>

              {/* Check */}
              {isSelected && (
                <Text style={styles.check}>✓</Text>
              )}

            </Pressable>
          )
        }}
      />
    </BottomSheet>
  )
}