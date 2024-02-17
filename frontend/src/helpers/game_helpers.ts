import { ApiRequest } from "./api_helpers";

export const find_game = async (player_id: string) =>{
    const req = new ApiRequest("POST" ,"/find_game.php");
    return await req._exec_post({ "player_id":player_id })
}

