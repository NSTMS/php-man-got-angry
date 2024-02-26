import { AppComponent } from "../app/app.component";
import { game_paths } from "../assets/gameboard";
import { GameAndPlayerData } from "../types/apiResponsesTypes";
import { ApiRequest } from "./api_helpers";
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
    let can_start = true;
    if(players.length <=1) return false;
    if(players.filter(player => player.player_status !== 'in_lobby_ready').length > 0) can_start = false;
    if(can_start)
    {
        const req = new ApiRequest("POST","/start_game.php");
        await req._exec_post({ "game_id":game_id });
    }
    return can_start;
}


export const start_refresh_data_interval = async (ctx: AppComponent) => {
    setInterval(() => {
        const session_id = localStorage.getItem('session_id');
        (async()=>{
            if(session_id){
                const data = await find_game(session_id);
                if(data) set_ctx_props(ctx, data);
            }
        })()

    }, 1000);
}

export const set_ctx_props = async (ctx: AppComponent, data: GameAndPlayerData) => {
    ctx.game = structuredClone(data.game);
    ctx.current_player = await get_player_by_id(data.player_id);
    ctx.player_color = data.player_color;
    ctx.players = await get_game_players(ctx.game.game_id);
    ctx.disabled = ctx.game.game_status === 'in_progress' ? "all" : 'none'
    ctx.game_path = game_paths[ctx.player_color];
    ctx.player_status = ctx.current_player?.player_status === "in_lobby_ready";
}