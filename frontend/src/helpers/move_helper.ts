
import { AppComponent } from "../app/app.component";
import { game_paths } from "../assets/gameboard";
import { Pawn } from "../types/gameTypes";
import { ApiRequest } from "./api_helpers";

export const get_pawn_game_path = (color: string) => {
    const path = game_paths[color];
    if (!path) {
       throw new Error(`Color ${color} not found in game paths`);
    }
    return path;
   }
   
   export const get_next_position = (pawn: Pawn, path: number[], steps: number): number => {
    let currentIndex = path.indexOf(pawn.pos);
    if(pawn.status === "in_home") return path[0];
    if (currentIndex === -1) {
       throw new Error(`Pawn's current position ${pawn.pos} not found in game path`);
    }
    const nextIndex = (currentIndex + steps) % path.length; // Ensure nextIndex wraps around the path
    return path[nextIndex];
   }
   
   export const move_pawn_by_position = (players_pawns: Record<string, Pawn[]>, pawn: Pawn, pos: number): void => {
    update_pawn_position(players_pawns, {...pawn, pos});
   }
   
   export const move_pawn_by_steps = async (ctx: AppComponent, pawn: Pawn, steps: number): Promise<Record<string, Pawn[]>> => {
    const players_pawns = ctx.game!.players_pawns;
    const path = get_pawn_game_path(pawn.color).game_path;
    const nextPosition = get_next_position(pawn, path, steps);
    check_collision(players_pawns, nextPosition, pawn.color);
    const newPawn = {...pawn, pos: nextPosition,status: 'in_game'} as Pawn;
    ctx.game!.players_pawns = update_pawn_position(players_pawns, newPawn);
    const req = new ApiRequest("POST", "/update_game.php");
    const res = await req._exec_post({ "game_id": ctx.game!.game_id, "players_pawns": JSON.stringify(ctx.game!.players_pawns)});
    const data = await res.json() as Record<string, Pawn[]>;
    ctx.game!.players_pawns = data;
    return data;
   }
   
   export const update_pawn_position = (players_pawns: Record<string, Pawn[]>, pawn: Pawn): Record<string, Pawn[]> => {
    const playerPawns = players_pawns[pawn.color];
    const updatedPawns = playerPawns.map(p => p.pawn_id === pawn.pawn_id ? {...pawn} : p);
    players_pawns[pawn.color] = updatedPawns;
    return players_pawns;
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
    if(pawns_on_position.length == 0) return;
    pawns_on_position.forEach(pawn => move_pawn_to_base(players_pawns, pawn));
}

export const restore_pawns_positions = (players_pawns: Record<string, Pawn[]>) =>{
    Object.values(players_pawns).flat().forEach(pawn => {
        move_pawn_by_position(players_pawns, pawn, pawn.pos);
    });
}



