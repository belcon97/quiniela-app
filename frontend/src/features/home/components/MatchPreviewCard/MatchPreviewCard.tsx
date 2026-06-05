import { View, Text } from 'react-native'
// Hooks
import { useStyles } from '@/shared/hooks/useStyles'
// Componentes
import { Flag } from '@/shared/ui/Flag/Flag'
// Estilos
import { makeStyles } from './MatchPreviewCard.styles'

interface Team {
  name:    string
  flagUrl: string
}

interface MatchPreviewCardProps {
  home: Team
  away: Team
  date: string
}

export function MatchPreviewCard({
  home,
  away,
  date,
}: MatchPreviewCardProps) {
  const styles = useStyles(makeStyles)

  return (
    <View style={styles.card}>

      {/* Match */}
      <View style={styles.match}>

        {/* Home */}
        <View style={styles.team}>
          <Flag uri={home.flagUrl} name={home.name} size="lg" />
          <Text style={styles.teamName}>{home.name}</Text>
        </View>

        {/* VS */}
        <Text style={styles.vs}>VS</Text>

        {/* Away */}
        <View style={styles.team}>
          <Flag uri={away.flagUrl} name={away.name} size="lg" />
          <Text style={styles.teamName}>{away.name}</Text>
        </View>

      </View>

      {/* Date */}
      <Text style={styles.date}>{date}</Text>

    </View>
  )
}