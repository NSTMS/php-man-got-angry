import { ApiRequest } from "./api_helpers";

export const find_game = async (player_id: string) =>{
    const req = new ApiRequest("POST" ,"/find_game.php");
    return await req._exec_post({ "player_id":player_id })
}

export const add_player_to_room = async (player_name: string) =>{
    const req = new ApiRequest("POST" ,"/add_player_to_room.php");
    return await req._exec_post({ "player_name":player_name })
}



