import { View, Text, Pressable } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
// Hooks
import { useTheme } from '@/theme'
import { useStyles } from '@/shared/hooks/useStyles'
// Components
import { Flag } from '@/shared/ui/Flag/Flag'
// Styles
import { makeStyles } from './SelectField.styles'

interface SelectFieldProps {
  label?:       string
  placeholder?: string
  value?:       string     
  flagUrl?:     string      
  onPress:      () => void   
}

export function SelectField({
  label,
  placeholder = 'Seleccioná una opción',
  value,
  flagUrl,
  onPress,
}: SelectFieldProps) {
  const theme  = useTheme()
  const styles = useStyles(makeStyles)

  const hasValue = !!value

  return (
    <View style={styles.wrapper}>

      {/* Label */}
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Field */}
      <Pressable onPress={onPress} style={styles.field}>

        {/* Content */}
        <View style={styles.content}>

          {/* Flag  */}
          {hasValue && flagUrl && (
            <Flag uri={flagUrl} name={value!} size="sm" />
          )}

          {/* Text */}
          <Text style={hasValue ? styles.value : styles.placeholder}>
            {hasValue ? value : placeholder}
          </Text>

        </View>

        {/* Chevron */}
        <Feather
          name="chevron-down"
          size={18}
          color={theme.textSecondary}
          style={styles.chevron}
        />

      </Pressable>

    </View>
  )
}