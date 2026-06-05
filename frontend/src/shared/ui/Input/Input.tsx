import { useState } from 'react'
import { View, Text, TextInput, Pressable, Platform, type TextInputProps } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import { useTheme } from '@/theme'
import { useStyles } from '@/shared/hooks/useStyles'
import { makeStyles } from './Input.styles'

interface InputProps extends TextInputProps {
  icon?:            React.ReactNode
  label?:           string
  error?:           string
  secureTextEntry?: boolean
}

export function Input({
  icon,
  label,
  error,
  secureTextEntry = false,
  ...rest
}: InputProps) {
  const theme = useTheme()
  const styles = useStyles(makeStyles)

  const [isFocused, setIsFocused] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <View style={styles.wrapper}>

      {/* Label */}
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Input row */}
      <View style={[
        styles.inputRow,
        isFocused && styles.inputRowFocused,
        !!error && styles.inputRowError,
      ]}>

        {/* Icon */}
        {icon && <View style={styles.icon}>{icon}</View>}

        {/* Field */}
        <TextInput
          style={[
            styles.input,
            Platform.OS === 'web' && { outlineStyle: 'none' } as any,
          ]}
          placeholderTextColor={theme.textDisabled}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...(Platform.OS === 'web' ? { type: 'text' } : {})}
          {...rest}
        />

        {/* show/hide password */}
        {secureTextEntry && (
          <Pressable
            onPress={() => setIsPasswordVisible(prev => !prev)}
            style={styles.trail}
          >
            <Feather
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={18}
              color={theme.textSecondary}
            />
          </Pressable>
        )}

      </View>

      {/* Error */}
      {error && <Text style={styles.error}>{error}</Text>}

    </View>
  )
}