import { Pawn } from "./gameTypes"

export type Player = {
    player_id : string,
    player_name : string,
    player_status : "in_lobby" | "in_lobby_ready" | "in_lobby_not_ready" | "in_game_moving" | "in_game_waiting" 
    player_game_id : string | null, // jeśli null to nie jest w żadnej grze 
    player_color : "red" | "green" | "blue" | "yellow" | "LOBBY", // jeśli null to nie jest w żadnej grze
    player_figures_position: number[], // tablica z indexami pól na których stoją pionki
}

export type GameResponse = {
    game_id : string,
    game_players_id : string[], 
    game_status : "created" | "in_progress" | "finished"
    game_state : string // długi jakiś taki
    time_left_for_move : number, //czas na ruch nastepnego gracza
    available_player_colors: string[],
    players_pawns: Record<string, Pawn[]>, // uzupełnij to w php !!!!
}



export type GameAndPlayerData = {
    player_id: string ,
    player_color: string 
    game: GameResponse,
    session_id: string
}

export type GameId_PlayerId_PlayerColor = {
    game_id: string,
    session_id: string,
    player_id: string ,
    player_color: string,
}