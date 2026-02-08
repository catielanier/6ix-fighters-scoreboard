export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export interface Player {
  name: string;
  imageUrl: string;
}

export interface Team {
  name: string;
  players: Player[];
  score: number;
  logoUrl: string;
}

export interface Division {
  divisionNumber: number;
  teams: Team[];
}

export interface Matchup {
  teams: Team[];
  homeScore: number;
  awayScore: number;
}

export interface Leaderboard {
  divisions: Division[];
}

export interface Timeout {
  team: Team;
}

export interface TeamShort {
  name: string;
  slug: string;
  logoUrl: string;
}

export interface MatchPlayer extends Player {
  isWinner: boolean;
  score: number;
}

export interface IScoreboard {
  homeTeam: {
    activePlayer: MatchPlayer;
    benchPlayer: MatchPlayer;
    inactivePlayers: MatchPlayer[];
    score: number;
  };
  awayTeam: {
    activePlayer: MatchPlayer;
    benchPlayer: MatchPlayer;
    inactivePlayers: MatchPlayer[];
    score: number;
  };
}
