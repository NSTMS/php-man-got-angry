import { Game, Pawn } from "./gameTypes"

export type Player = {
    player_id : string,
    player_name : string,
    player_status : "in_lobby" | "in_lobby_ready" | "in_lobby_not_ready" | "in_game_moving" | "in_game_waiting" 
    player_game_id : string | null, // jeśli null to nie jest w żadnej grze 
    player_color : "red" | "green" | "blue" | "yellow" | "LOBBY", // jeśli null to nie jest w żadnej grze
    player_figures_position: number[], // tablica z indexami pól na których stoją pionki
}


export type PlayerPawns = Record<string, Pawn[]>

export type GameAndPlayerData = {
    player_id: string ,
    player_color: string 
    game: Game,
    session_id: string
}

export type GameId_PlayerId_PlayerColor = {
    game_id: string,
    session_id: string,
    player_id: string ,
    player_color: string,
}