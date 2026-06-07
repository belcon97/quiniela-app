// Types
import type { Match } from "@/shared/types";

export interface TeamStanding {
  teamName: string;
  flagUrl: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gd: number; // diferencia de goles
  points: number;
}

export function calculateStandings(matches: Match[]): TeamStanding[] {
  const standings: Record<string, TeamStanding> = {};

  const getOrCreate = (teamName: string, flagUrl: string): TeamStanding => {
    if (!standings[teamName]) {
      standings[teamName] = {
        teamName,
        flagUrl,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        gd: 0,
        points: 0,
      };
    }
    return standings[teamName];
  };

  matches.forEach((match) => {
    if (
      match.status !== "completed" ||
      match.homeScore === null ||
      match.awayScore === null
    )
      return;

    const home = getOrCreate(match.homeTeam, match.homeFlag);
    const away = getOrCreate(match.awayTeam, match.awayFlag);

    home.played++;
    away.played++;
    home.gd += match.homeScore - match.awayScore;
    away.gd += match.awayScore - match.homeScore;

    if (match.homeScore > match.awayScore) {
      home.won++;
      home.points += 3;
      away.lost++;
    } else if (match.homeScore < match.awayScore) {
      away.won++;
      away.points += 3;
      home.lost++;
    } else {
      home.drawn++;
      home.points++;
      away.drawn++;
      away.points++;
    }
  });

  // Ordena por puntos desc, luego por DG desc
  return Object.values(standings).sort((teamA, teamB) =>
    teamB.points !== teamA.points
      ? teamB.points - teamA.points
      : teamB.gd - teamA.gd,
  );
}
