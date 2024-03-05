
import { AppComponent } from "../app/app.component";
import { game_paths } from "../assets/gameboard";
import { Pawn } from "../types/gameTypes";
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
    // dodaj tutaj żeby kropka się zrobiła na UI
    return nextPosition;
}


export const move_pawn_by_steps = async (ctx: AppComponent, pawn: Pawn, steps: number): Promise<Record<string, Pawn[]>> => {
    const players_pawns = ctx.game!.players_pawns;
    const path = get_pawn_game_path(pawn.color).game_path;
    const nextPosition = get_next_position(pawn, path, steps);
    if(!check_collision(ctx,players_pawns, nextPosition, pawn.color)) return players_pawns;
    
    const newPawn = { ...pawn, pos: nextPosition, status: 'in_game' } as Pawn;
    ctx.game!.players_pawns = update_pawn_position(players_pawns, newPawn);
    return await update_game(ctx);
}


export const update_pawn_position = (players_pawns: Record<string, Pawn[]>, pawn: Pawn): Record<string, Pawn[]> => {
    const playerPawns = players_pawns[pawn.color];
    const updatedPawns = playerPawns.map(p => p.pawn_id === pawn.pawn_id ? { ...pawn } : p);
    players_pawns[pawn.color] = updatedPawns;
    return players_pawns;
}


export const move_pawn_to_base = (players_pawns: Record<string, Pawn[]>, pawn: Pawn) => {
    const base = get_pawn_game_path(pawn.color).base_points;
    const pawns_in_base = players_pawns[pawn.color].filter(pawn => pawn.status === "in_home").map(pawn => pawn.pos);
    const empty_pos = base.findIndex(pos => !pawns_in_base.includes(pos));
    pawn.status = "in_home";
    pawn.pos = base[empty_pos];
    return update_pawn_position(players_pawns, pawn);
}

export const check_collision = (ctx: AppComponent, players_pawns: Record<string, Pawn[]>, position: number, color: string) => {
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

export const restore_pawns_positions = (players_pawns: Record<string, Pawn[]>) => {
    Object.values(players_pawns).flat().forEach(pawn => {
        update_pawn_position(players_pawns, { ...pawn });
    });
}



