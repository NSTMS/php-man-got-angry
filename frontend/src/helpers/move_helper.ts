
import { game_paths } from "../assets/gameboard";
import { Pawn } from "../types/gameTypes";

export const get_pawn_game_path = (color: string) => {
    return game_paths[color];
}

export const get_next_position = (pawn: Pawn, path: number[], steps: number) =>{
    const next_position = path.indexOf(pawn.pos) + steps;
    return next_position;
}

export const move_pawn_by_position = (players_pawns: Record<string, Pawn[]> ,pawn: Pawn, pos: number) =>{
    const path = get_pawn_game_path(pawn.color).game_path;
    check_collision(players_pawns,path[pos], pawn.color);
    pawn.pos = path[pos];
    return update_pawn_position(players_pawns, pawn);
}

export const move_pawn_by_steps = (players_pawns: Record<string, Pawn[]> ,pawn: Pawn, steps:number) => {
    const path = get_pawn_game_path(pawn.color).game_path;
    const next_position = get_next_position(pawn, path, steps);
    check_collision(players_pawns,path[next_position], pawn.color);
    pawn.pos = path[next_position];
    return update_pawn_position(players_pawns, pawn);
}

export const update_pawn_position = (players_pawns: Record<string, Pawn[]> ,pawn: Pawn) =>{
    const playerPawns = players_pawns[pawn.color];
    const updatedPawns = playerPawns.map(p => {
        if (p.pawn_id === pawn.pawn_id) {
            return { ...p, pos: pawn.pos };
        }
        return p;
    });
    players_pawns[pawn.color] = structuredClone(updatedPawns);
    return players_pawns;
}

export const move_pawn_to_starting_point = (players_pawns: Record<string, Pawn[]> ,pawn: Pawn) =>{
    const starting_point = get_pawn_game_path(pawn.color).starting_point;
    check_collision(players_pawns,starting_point, pawn.color);
    pawn.status = "in_game";
    pawn.pos = starting_point;
    return update_pawn_position(players_pawns, pawn);
}

export const move_pawn_to_base = (players_pawns: Record<string, Pawn[]> , pawn: Pawn) =>{
    const base = get_pawn_game_path(pawn.color).base_points;
    const pawns_in_base = players_pawns[pawn.color].filter(pawn => pawn.status === "in_home").map(pawn => pawn.pos);
    const empty_pos = base.findIndex(pos => !pawns_in_base.includes(pos));
    pawn.status = "in_home";
    pawn.pos = base[empty_pos];
    return update_pawn_position(players_pawns, pawn);
}

export const check_collision = (players_pawns: Record<string, Pawn[]> ,position: number, color: string) =>{
    const all_pawns = Object.values(players_pawns).flat();
    const pawns_on_position = all_pawns.filter(pawn => pawn.pos === position && pawn.color !== color);
    if(pawns_on_position.length > 0){
        pawns_on_position.forEach(pawn => move_pawn_to_base(players_pawns, pawn));
    }
}

export const restore_pawns_positions = (players_pawns: Record<string, Pawn[]>) =>{
    Object.values(players_pawns).flat().forEach(pawn => {
        if(pawn.status === "in_game") move_pawn_by_position(players_pawns, pawn, pawn.pos);
    });
}



