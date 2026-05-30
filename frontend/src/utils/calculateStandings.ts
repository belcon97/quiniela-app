import type { Match } from "@/types/shared.types";
import type { TeamStanding, GroupStanding, KnockoutPhase } from "../features/standings/types/standings.types";

const GROUP_PHASES = ["Grupo A", "Grupo B", "Grupo C", "Grupo D", "Grupo E", "Grupo F", "Grupo G", "Grupo H", "Grupo I", "Grupo J", "Grupo K", "Grupo L"];

// Verifica si un grupo es fase de grupos
export const isGroupPhase = (group: string) =>
  GROUP_PHASES.includes(group);

// Calcula la tabla de posiciones por grupo
export function calculateGroupStandings(matches: Match[]): GroupStanding[] {
  const groupMatches = matches.filter((m) => isGroupPhase(m.group ?? ""));

  // Agrupa los partidos por grupo
  const groupMap = new Map<string, Match[]>();
  for (const match of groupMatches) {
    const group = match.group!;
    if (!groupMap.has(group)) groupMap.set(group, []);
    groupMap.get(group)!.push(match);
  }

  const standings: GroupStanding[] = [];

  for (const [group, groupMatchList] of groupMap.entries()) {
    // Construye el mapa de equipos
    const teamMap = new Map<string, TeamStanding>();

    const getOrCreate = (team: string, flag: string): TeamStanding => {
      if (!teamMap.has(team)) {
        teamMap.set(team, {
          team,
          flag,
          played: 0,
          won: 0,
          drawn: 0,
          lost: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          goalDiff: 0,
          points: 0,
        });
      }
      return teamMap.get(team)!;
    };

    // Procesa solo partidos completados
    for (const match of groupMatchList) {
      if (match.status !== "completed") {
        // Si no está completado, solo registra los equipos
        getOrCreate(match.homeTeam, match.homeFlag);
        getOrCreate(match.awayTeam, match.awayFlag);
        continue;
      }

      const homeScore = match.homeScore ?? 0;
      const awayScore = match.awayScore ?? 0;

      const home = getOrCreate(match.homeTeam, match.homeFlag);
      const away = getOrCreate(match.awayTeam, match.awayFlag);

      // Partidos jugados
      home.played++;
      away.played++;

      // Goles
      home.goalsFor += homeScore;
      home.goalsAgainst += awayScore;
      away.goalsFor += awayScore;
      away.goalsAgainst += homeScore;

      // Resultado
      if (homeScore > awayScore) {
        home.won++;
        home.points += 3;
        away.lost++;
      } else if (homeScore < awayScore) {
        away.won++;
        away.points += 3;
        home.lost++;
      } else {
        home.drawn++;
        away.drawn++;
        home.points += 1;
        away.points += 1;
      }

      // Diferencia de goles
      home.goalDiff = home.goalsFor - home.goalsAgainst;
      away.goalDiff = away.goalsFor - away.goalsAgainst;
    }

    // Ordena por puntos, diferencia de goles, goles a favor
    const sorted = Array.from(teamMap.values()).sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
      return b.goalsFor - a.goalsFor;
    });

    standings.push({ group, teams: sorted });
  }

  // Ordena los grupos alfabéticamente
  return standings.sort((a, b) => a.group.localeCompare(b.group));
}

// Agrupa los partidos de fase eliminatoria por fase
export function calculateKnockoutPhases(matches: Match[]): KnockoutPhase[] {
  const knockoutMatches = matches.filter((m) => !isGroupPhase(m.group ?? ""));

  const phaseOrder = [
    "Dieciseisavos",
    "Octavos",
    "Cuartos",
    "Semifinal",
    "Final",
  ];

  const phaseMap = new Map<string, Match[]>();
  for (const match of knockoutMatches) {
    const phase = match.group!;
    if (!phaseMap.has(phase)) phaseMap.set(phase, []);
    phaseMap.get(phase)!.push(match);
  }

  return phaseOrder
    .filter((phase) => phaseMap.has(phase))
    .map((phase) => ({
      phase,
      matches: phaseMap.get(phase)!.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
    }));
}