import { View, Text, Pressable } from 'react-native'
import { useStyles } from '@/shared/hooks/useStyles'
import { makeStyles } from './TabSwitch.styles'

interface TabSwitchProps {
  options:     string[]
  activeIndex: number
  onChange:    (index: number) => void
}

export function TabSwitch({
  options,
  activeIndex,
  onChange,
}: TabSwitchProps) {
  const styles = useStyles(makeStyles)

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <Pressable
          key={option}
          onPress={() => onChange(index)}
          style={[
            styles.option,
            activeIndex === index && styles.option_active,
          ]}
        >
          {/* Label */}
          <Text style={[
            styles.label,
            activeIndex === index && styles.label_active,
          ]}>
            {option}
          </Text>
        </Pressable>
      ))}
    </View>
  )
}