import { Pressable, Text } from 'react-native'
import { useStyles } from '@/shared/hooks/useStyles'
import { makeStyles } from './Button.styles'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children?:     React.ReactNode
  icon?:         React.ReactNode
  iconPosition?: 'left' | 'right'
  variant?:      Variant
  size?:         Size
  disabled?:     boolean
  onPress?:      () => void
}

export function Button({
  children,
  icon,
  iconPosition = 'left',
  variant = 'primary',
  size = 'md',
  disabled = false,
  onPress,
}: ButtonProps) {
  const styles = useStyles(makeStyles)

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        styles[size],
        styles[variant],
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      {/* Icon left */}
      {icon && iconPosition === 'left' && icon}

      {/* Label */}
      {children && (
        <Text style={[styles[`text_${variant}`], styles[`text_${size}`]]}>
          {children}
        </Text>
      )}

      {/* Icon right */}
      {icon && iconPosition === 'right' && icon}
    </Pressable>
  )
}