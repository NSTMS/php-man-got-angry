import { Game } from "../types/apiResponsesTypes";
import { ApiRequest } from "./api_helpers";
import { get_game_players } from "./player_helper";

export const find_game = async (player_id: string) =>{
    const req = new ApiRequest("POST" ,"/find_game.php");
    return await req._exec_post({ "player_id":player_id })
}

export const check_game_start = async (game_id : string) =>{
    const req = new ApiRequest("POST" ,"/get_game.php");
    const res = await req._exec_post({ "game_id":game_id });
    const game = await res.json() as Game;
    const players = await get_game_players(game.game_players_id);
    let can_start = true;
    if(players.length !== 4) return false;
    for(let player of players){
        if(player.player_status !== 'in_lobby_ready'){
            can_start = false; 
            break;
        } 
    }
    if(can_start)
    {
        req.params = "/start_game.php";
        await req._exec_post({ "game_id":game_id});
    }
    return can_start;
}