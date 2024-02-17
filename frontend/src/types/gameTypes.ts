export type Tile = {
    background_color : string, 
    role : "blank" | "gameboard_tile" | "starting_base" | "ending_base" | "starting_point" | "ending_point" | "dice",
    type: "blank" | "tile",
    occupied : boolean
}

export type GamePath = {
    game_path: number[],
    base_points: number[],
    starting_point: number,
    ending_base_entry: number,
    ending_base_path: number[]
  }