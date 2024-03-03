import { AppComponent } from "../app/app.component";
import { game_paths } from "../assets/gameboard";
import { GameAndPlayerData } from "../types/apiResponsesTypes";
import { Game, Pawn } from "../types/gameTypes";
import { ApiRequest } from "./api_helpers";
import { restore_pawns_positions } from "./move_helper";
import { get_game_players, get_player_by_id } from "./player_helper";

export const find_game = async (session_id : string | null) => {
    if(!session_id) return null;
    const req = new ApiRequest("POST" ,"/find_game.php");
    const res = await req._exec_post({ "session_id": session_id });
    const data = await res.json() as GameAndPlayerData | null;
    return data;
}

export const check_game_start = async (game_id : string) =>{
    const players = await get_game_players(game_id);
    if(players.length <=1) return false;
    if(players.filter(player => player.player_status !== 'in_lobby_ready').length > 0) return false;
    const req = new ApiRequest("POST","/start_game.php");
    await req._exec_post({ "game_id":game_id });
    return true;
}
export const update_game = async (ctx: AppComponent) =>{
    const req = new ApiRequest("POST","/update_game.php");
    const res = await req._exec_post({ "game_id": ctx.game!.game_id, "players_pawns": JSON.stringify(ctx.game!.players_pawns)});
    const data = await res.json() as Record<string, Pawn[]>;
    return data;
}

export const start_refresh_data_interval = async (ctx: AppComponent) => {
    const interval = setInterval(() => {
        const session_id = localStorage.getItem('session_id');
        if(!session_id) stop_game(interval);
        (async()=>{
                const data = await find_game(session_id);
                if(!data) stop_game(interval); 
                set_ctx_props(ctx, data!);
        })()

    }, 1000);
}

const stop_game = (interval: any) => {
    clearInterval(interval);
    localStorage.clear();
    alert("nie mieszaj nic w sesji bro");
    window.location.reload();
}

export const set_ctx_props = async (ctx: AppComponent, data: GameAndPlayerData) => {
    const player = await get_player_by_id(data.player_id);
    const players = await get_game_players(data.game.game_id);
    const game = structuredClone(ctx.game!)
    ctx.game = {
        ...game, 
        game_id: data.game.game_id,
        current_player: player,
        player_color: data.player_color,
        players: players,
        disabled: data.game.game_status === 'in_progress' ? "all" : 'none',
        game_path: game_paths[data.player_color].game_path,
        game_status: data.game.game_status,
        player_status: player?.player_status === "in_lobby_ready",
        time_left_for_move: data.game.time_left_for_move,
        players_pawns: data.game.players_pawns,
    };
    ctx.players_pawns = data.game.players_pawns;
    restore_pawns_positions(ctx.game!.players_pawns);
}

let players_pawns : Record<string, Pawn[]> = {
    "red":[
        {pawn_id:1, pos: 10, color:"red", status: "in_home"},
        {pawn_id:2, pos: 11, color:"red", status: "in_home"},
        {pawn_id:3, pos: 23, color:"red", status: "in_home"},
        {pawn_id:4, pos: 24, color:"red", status: "in_home"},
    ],
    "blue":[
        {pawn_id:1, pos: 19, color:"blue", status: "in_home"},
        {pawn_id:2, pos: 20, color:"blue", status: "in_home"},
        {pawn_id:3, pos: 30, color:"blue", status: "in_home"},
        {pawn_id:4, pos: 31, color:"blue", status: "in_home"},
    ],
    "yellow":[
        {pawn_id:1, pos: 89, color:"yellow", status: "in_home"},
        {pawn_id:2, pos: 90, color:"yellow", status: "in_home"},
        {pawn_id:3, pos: 100, color:"yellow", status: "in_home"},
        {pawn_id:4, pos: 101, color:"yellow", status: "in_home"},
    ],
    "green":[
        {pawn_id:1, pos: 96, color:"green", status: "in_home"},
        {pawn_id:2, pos: 97, color:"green", status: "in_home"},
        {pawn_id:3, pos: 107, color:"green", status: "in_home"},
        {pawn_id:4, pos: 108, color:"green", status: "in_home"},
    ],
}
