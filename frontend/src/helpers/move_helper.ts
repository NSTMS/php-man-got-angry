
import { AppComponent } from "../app/app.component";
import { game_paths } from "../assets/gameboard";
import { PlayerPawns } from "../types/apiResponsesTypes";
import { Pawn } from "../types/gameTypes";
import { ApiRequest } from "./api_helpers";
import { update_game } from "./game_helpers";

export const get_pawn_game_path = (color: string) => {
    const path = game_paths[color];
    if (!path) {
        throw new Error(`Color ${color} not found in game paths`);
    }
    return path;
}

export const get_next_position = (pawn: Pawn, path: number[], steps: number): number => {
    const currentIndex = path.indexOf(pawn.pos);
    const nextIndex = (currentIndex + steps);

    if (pawn.status === "in_home") return path[0];
    if (currentIndex === -1) throw new Error(`Pawn's current position ${pawn.pos} not found in game path`);
    if (nextIndex > path.length - 1) return path[currentIndex]; 

    return path[nextIndex];
}


export const show_possible_move = (ctx: AppComponent, pawn: Pawn, steps: number) => {
    const path = get_pawn_game_path(pawn.color).game_path;
    const nextPosition = get_next_position(pawn, path, steps);
    return nextPosition;
}


export const move_pawn_by_steps = async (ctx: AppComponent, pawn: Pawn, steps: number): Promise<PlayerPawns> => {
    const players_pawns = ctx.game!.players_pawns;
    const path = get_pawn_game_path(pawn.color).game_path;
    const nextPosition = get_next_position(pawn, path, steps);
    if(!check_collision(ctx,players_pawns, nextPosition, pawn.color)) return players_pawns;
    
    const status = steps == 0 ? "in_game" : pawn.status
    const newPawn = { ...pawn, pos: nextPosition, status: status } as Pawn;
    ctx.game!.players_pawns = update_pawn_position(players_pawns, newPawn);
    const pawns = await update_game(ctx);
    check_if_player_won(ctx, pawn.color);
    return pawns;
}
export const check_if_player_won = (ctx: AppComponent, color: string) => {
    const pawns = ctx.game!.players_pawns[color];
    const base = get_pawn_game_path(color).ending_base_path;
    const pawns_in_base = pawns.filter(p => base.includes(p.pos));
    if(pawns_in_base.length === 4) {
        // send to api
        
        alert(`Player ${color} won!`)
    }
}

export const update_pawn_position = (players_pawns: PlayerPawns, pawn: Pawn): PlayerPawns => {
    const playerPawns = players_pawns[pawn.color];
    const updatedPawns = playerPawns.map(p => p.pawn_id === pawn.pawn_id ? { ...pawn } : p);
    players_pawns[pawn.color] = updatedPawns;
    return players_pawns;
}


export const move_pawn_to_base = (players_pawns: PlayerPawns, pawn: Pawn) => {
    const base = get_pawn_game_path(pawn.color).base_points;
    const pawns_in_base = players_pawns[pawn.color].filter(pawn => pawn.status === "in_home").map(pawn => pawn.pos);
    const empty_pos = base.findIndex(pos => !pawns_in_base.includes(pos));
    pawn.status = "in_home";
    pawn.pos = base[empty_pos];
    return update_pawn_position(players_pawns, pawn);
}

export const check_collision = (ctx: AppComponent, players_pawns: PlayerPawns, position: number, color: string) => {
    const all_pawns = Object.values(players_pawns).flat();
    const pawns_on_position = all_pawns.filter(pawn => pawn.pos === position && pawn.color !== color);
    pawns_on_position.forEach(pawn => move_pawn_to_base(players_pawns, pawn));
    const base = get_pawn_game_path(color).ending_base_path;
    const pawns_in_base_at_position = all_pawns.filter(pawn => pawn.pos === position && pawn.color == color);  
    if(base.includes(position) && pawns_in_base_at_position.length > 0) 
    {    
        pawns_in_base_at_position.map(p => p.status = 'in_finish');
        pawns_in_base_at_position.forEach(p => players_pawns = structuredClone(update_pawn_position(players_pawns, {...p, status: 'in_finish'})))
        ctx.game!.players_pawns = structuredClone(players_pawns);
        update_game(ctx);
        return false; 
    }

    return true;

}

export const restore_pawns_positions = (players_pawns: PlayerPawns) => {
    Object.values(players_pawns).flat().forEach(pawn => {
        update_pawn_position(players_pawns, { ...pawn });
    });
}



