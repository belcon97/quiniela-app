import { Modal, View, Text, Pressable, StyleSheet } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import { BlurView } from 'expo-blur'
// Hooks
import { useTheme } from '@/theme'
import { useStyles } from '@/shared/hooks/useStyles'
// Styles
import { makeStyles } from './ConfirmModal.styles'

interface ConfirmModalProps {
  visible:        boolean
  title:          string
  subtitle:       string
  confirmLabel?:  string
  showTrashIcon?: boolean
  onClose:        () => void
  onConfirm:      () => void
  children?:      React.ReactNode
}

export function ConfirmModal({
  visible,
  title,
  subtitle,
  confirmLabel  = 'ELIMINAR',
  showTrashIcon = true,
  onClose,
  onConfirm,
  children,
}: ConfirmModalProps) {
  const theme  = useTheme()
  const styles = useStyles(makeStyles)

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Overlay con blur */}
      <BlurView
        intensity={20}
        tint={theme.isDark ? 'dark' : 'light'}
        style={StyleSheet.absoluteFillObject}
      >
        {/* Overlay */}
        <Pressable style={styles.overlay} onPress={onClose}>

          {/* Card */}
          <Pressable style={styles.card} onPress={event => event.stopPropagation()}>

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              <Pressable onPress={onClose} style={styles.closeBtn}>
                <Feather name="x" size={22} color={theme.textSecondary} />
              </Pressable>
            </View>

            {/* Subtitle */}
            <Text style={styles.subtitle}>{subtitle}</Text>

            {/* Children  */}
            {children}

            {/* Footer */}
            <View style={styles.footer}>
              <Pressable style={styles.cancelBtn} onPress={onClose}>
                <Text style={styles.cancelText}>CANCELAR</Text>
              </Pressable>
              <Pressable style={styles.confirmBtn} onPress={onConfirm}>
                {showTrashIcon && (
                  <Feather name="trash-2" size={16} color="#FFFFFF" />
                )}
                <Text style={styles.confirmText}>{confirmLabel}</Text>
              </Pressable>
            </View>

          </Pressable>
        </Pressable>
      </BlurView>
    </Modal>
  )
}