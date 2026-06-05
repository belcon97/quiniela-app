import { useEffect, useRef } from 'react'
import {
  Modal,
  View,
  Text,
  Pressable,
  Animated,
  Dimensions,
} from 'react-native'
import Feather from '@expo/vector-icons/Feather'
// Hooks
import { useTheme } from '@/theme'
import { useStyles } from '@/shared/hooks/useStyles'
// Styles
import { makeStyles } from './BottomSheet.styles'

const SCREEN_HEIGHT = Dimensions.get('window').height

interface BottomSheetProps {
  visible:   boolean
  title?:    string
  subtitle?: string
  onClose:   () => void
  children:  React.ReactNode
}

export function BottomSheet({
  visible,
  title,
  subtitle,
  onClose,
  children,
}: BottomSheetProps) {
  const theme      = useTheme()
  const styles     = useStyles(makeStyles)
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current
  const opacity    = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue:         1,
          duration:        250,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue:         0,
          damping:         20,
          stiffness:       200,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue:         0,
          duration:        200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue:         SCREEN_HEIGHT,
          duration:        200,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [visible])

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Overlay */}
      <Animated.View style={[styles.overlay, { opacity }]}>
        <Pressable style={{ flex: 1 }} onPress={onClose} />
      </Animated.View>

      {/* Sheet */}
      <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>

        {/* Handle */}
        <View style={styles.handle} />

        {/* Header  */}
        <View style={styles.header}>
          {title ? (
            <View style={styles.headerText}>
              <Text style={styles.title}>{title}</Text>
              {subtitle && (
                <Text style={styles.subtitle}>{subtitle}</Text>
              )}
            </View>
          ) : (
            <View style={{ flex: 1 }} />
          )}
          <Pressable onPress={onClose} style={styles.closeBtn}>
            <Feather name="x" size={22} color={theme.textSecondary} />
          </Pressable>
        </View>

        {/* Content */}
        {children}

      </Animated.View>
    </Modal>
  )
}