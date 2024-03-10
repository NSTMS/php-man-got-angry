import { Player, PlayerPawns } from "./apiResponsesTypes"

export type Tile = {
    background_color : string, 
    role : "blank" | "gameboard_tile" | "starting_base" | "ending_base" | "starting_point" | "ending_point" | "dice",
    type: "blank" | "tile" | "highlight",
}

export type GamePath = {
    game_path: number[],
    base_points: number[],
    ending_base_path: number[],
    starting_point: number,
}

export type Game = {
    game_id: string,
    game_status : "created" | "in_progress" | "finished",
    current_player : Player | null,
    player_status: boolean,
    player_color: string,
    players: Player[],
    disabled: "all" | "none",
    game_path: number[],
    player_on_move : string,
    has_moved: boolean,
    players_pawns: PlayerPawns,
}


export type Pawn = {  
    pawn_id: number,
    pos: number,
    color: string,
    status: "in_game" | "in_home" | "in_finish"
}
