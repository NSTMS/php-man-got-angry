import { Player } from "./apiResponsesTypes"

export type Tile = {
    background_color : string, 
    role : "blank" | "gameboard_tile" | "starting_base" | "ending_base" | "starting_point" | "ending_point" | "dice",
    type: "blank" | "tile",
}

export type GamePath = {
    game_path: number[],
    base_points: number[],
    starting_point: number,
    ending_base_entry: number,
    ending_base_path: number[]
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
    time_left_for_move: number
    players_pawns: Record<string, Pawn[]>,
}


export type Pawn = {  
    pawn_id: number,
    pos: number,
    color: string,
    status: "in_game" | "in_home" | "in_finish"
}
