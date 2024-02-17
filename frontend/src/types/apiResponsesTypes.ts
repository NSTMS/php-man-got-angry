export type Player = {
    player_id : string,
    player_name : string,
    player_status : string, //  in_lobby, in_lobby_ready, in_lobby_not_ready, in_game_moving, in_game_waiting 
    player_game_id : string | null, // jeśli null to nie jest w żadnej grze 
    player_color : "red" | "green" | "blue" | "yellow" | "LOBBY", // jeśli null to nie jest w żadnej grze
    player_figures_position: number[], // tablica z indexami pól na których stoją pionki
}

export type Game = {
    game_id : string,
    game_players_id : string[], 
    game_status : "created" | "in_progress" | "finished"
    game_state : string // długi jakiś taki
    time_left_for_move : number //czas na ruch nastepnego gracza
}

export type GameAndPlayerData = {
    player_id: string ,
    player_color: string 
    game: Game,
}