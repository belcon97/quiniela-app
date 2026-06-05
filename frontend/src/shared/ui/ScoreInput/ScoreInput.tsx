import { useState } from 'react'
import { TextInput } from 'react-native'
// Hooks
import { useTheme } from '@/theme'
import { useStyles } from '@/shared/hooks/useStyles'
// Utils
import { parseScore } from '@/shared/utils/parseScore'
// Styles
import { makeStyles } from './ScoreInput.styles'

interface ScoreInputProps {
  value:    number
  onChange: (value: number) => void
  max?:     number
}

export function ScoreInput({ value, onChange, max = 9 }: ScoreInputProps) {
  const theme  = useTheme()
  const styles = useStyles(makeStyles)

  // Puede estar vacio mientras el usuario escribe
  const [text, setText] = useState(value > 0 ? String(value) : '')

  const isFilled = text !== ''

  const handleChange = (newText: string) => {
    setText(newText)
    onChange(parseScore(newText, max))
  }

  return (
    <TextInput
      style={[styles.input, isFilled && styles.input_filled]}
      value={text}
      onChangeText={handleChange}
      keyboardType="numeric"
      maxLength={1}
      selectTextOnFocus
      textAlign="center"
      placeholder="0"
      placeholderTextColor={theme.textDisabled}
    />
  )
}