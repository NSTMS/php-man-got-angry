import { Game, GameAndPlayerData } from "../types/apiResponsesTypes";
import { ApiRequest } from "./api_helpers";
import { get_game_players } from "./player_helper";

export const find_game = async () =>{
    const req = new ApiRequest("GET" ,"/find_game.php");
    const res = await req._exec_get();
    const data = await res.json() as GameAndPlayerData | null;
    if(res) return { game: data?.game, player_color: data?.player_color, player_id: data?.player_id } as GameAndPlayerData;
    return null;
}

export const check_game_start = async (game_id : string) =>{
    const players = await get_game_players(game_id);
    let can_start = true;
    if(players.length <=1) return false;
    for(let player of players){
        if(player.player_status !== 'in_lobby_ready'){
            can_start = false; 
            break;
        } 
    }
    if(can_start)
    {
        const req = new ApiRequest("POST","/start_game.php");
        await req._exec_post({ "game_id":game_id});
    }
    return can_start;
}