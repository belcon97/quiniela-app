// React
import { useState } from 'react'

// React Native
import { ScrollView, View, Text, StyleSheet } from 'react-native'

// Hooks
import { space, fontSize, font } from '@/theme'
import { useStyles } from '@/shared/hooks/useStyles'

// Utils
import { getFlagByTeam } from '@/shared/utils/getFlagByTeam'

// Components — ranking
import { PodiumCard } from '@/features/ranking/components/PodiumCard/PodiumCard'
import { RankingRow } from '@/features/ranking/components/RankingRow/RankingRow'
import { MyPositionBar } from '@/features/ranking/components/MyPositionBar/MyPositionBar'

// Types
import type { Theme } from '@/theme'
import type { RankingEntry } from '@/shared/types'

// ─── Mock data ────────────────────────────────────────────────────────────────

const MY_USERNAME = 'mateo'

const MOCK_RANKING: RankingEntry[] = [
  { id: '1', username: 'carla',  name: 'Carla M.',  favoriteTeam: 'Brasil',    totalPoints: 128, position: 1 },
  { id: '2', username: 'diego',  name: 'Diego R.',  favoriteTeam: 'Argentina', totalPoints: 121, position: 2 },
  { id: '3', username: 'lucia',  name: 'Lucia P.',  favoriteTeam: 'España',    totalPoints: 110, position: 3 },
  { id: '4', username: 'marco',  name: 'Marco T.',  favoriteTeam: 'Francia',   totalPoints: 98,  position: 4 },
  { id: '5', username: 'anav',   name: 'Ana V.',    favoriteTeam: 'Brasil',    totalPoints: 94,  position: 5 },
  { id: '6', username: 'mateo',  name: 'Mateo R.',  favoriteTeam: 'México',    totalPoints: 90,  position: 6 },
  { id: '7', username: 'pablo',  name: 'Pablo S.',  favoriteTeam: null,        totalPoints: 86,  position: 7 },
  { id: '8', username: 'sofia',  name: 'Sofía L.',  favoriteTeam: 'Argentina', totalPoints: 82,  position: 8 },
]

const MOCK_MOVEMENTS: Record<string, number> = {
  marco: 2,
  anav:  -1,
  mateo: 3,
  sofia: -2,
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function TestScreen() {
  const styles = useStyles(makeStyles)

  // Podio — ordenado visualmente: 2, 1, 3
  const podium = MOCK_RANKING
    .filter(entry => entry.position <= 3)
    .sort((entryA, entryB) => {
      const order: Record<number, number> = { 1: 1, 2: 0, 3: 2 }
      return order[entryA.position] - order[entryB.position]
    })

  // Lista desde posición 4
  const rest = MOCK_RANKING.filter(entry => entry.position > 3)

  // Mi entrada
  const myEntry = MOCK_RANKING.find(entry => entry.username === MY_USERNAME)!

  return (
    <View style={styles.screen}>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* ── Podio ──────────────────────────────────────────────── */}
        <View style={styles.podium}>
          {podium.map(entry => (
            <PodiumCard
              key={entry.id}
              entry={entry}
              flagUrl={getFlagByTeam(entry.favoriteTeam)}
            />
          ))}
        </View>

        {/* ── Clasificación ──────────────────────────────────────── */}
        <Text style={styles.sectionLabel}>CLASIFICACIÓN · PTS</Text>

        <View style={styles.list}>
          {rest.map(entry => (
            <RankingRow
              key={entry.id}
              entry={entry}
              flagUrl={getFlagByTeam(entry.favoriteTeam)}
              movement={MOCK_MOVEMENTS[entry.username]}
            />
          ))}
        </View>

      </ScrollView>

      {/* ── Mi posición — fijo abajo ───────────────────────────── */}
      <MyPositionBar
        entry={myEntry}
        flagUrl={getFlagByTeam(myEntry.favoriteTeam)}
        movement={MOCK_MOVEMENTS[MY_USERNAME]}
      />

    </View>
  )
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

function makeStyles(t: Theme) {
  return StyleSheet.create({
    screen: {
      flex:            1,
      backgroundColor: t.bg,
    },
    content: {
      padding:       space[5],
      gap:           space[4],
      paddingBottom: space[10],
    },
    podium: {
      flexDirection:   'row',
      alignItems:      'flex-end',
      justifyContent:  'center',
      gap:             space[4],
      paddingVertical: space[4],
    },
    sectionLabel: {
      fontFamily:    font.notoBold,
      fontSize:      fontSize.micro,
      fontWeight:    '700',
      letterSpacing: 1.28,
      color:         t.textSecondary,
    },
    list: {
      gap: space[3],
    },
  })
}