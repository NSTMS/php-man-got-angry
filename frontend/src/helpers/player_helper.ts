import { ApiRequest } from "./api_helpers";
import type { Player, GameAndPlayerData} from "../types/apiResponsesTypes";
import { set_session_id } from "./sessions_helper";


export const add_player_to_room = async (player_name: string) =>{
    const req = new ApiRequest("POST" ,"/add_player_to_room.php");
    const res = await req._exec_post({ "player_name":player_name })
    const data = await res.json() as GameAndPlayerData;
    set_session_id(data.session_id);
    return data;
}


export const get_player_by_id = async (player_id : string | null): Promise<Player | null> => {
    if (player_id) {
      const req = new ApiRequest("POST", "/get_player.php");
      const res = await req._exec_post({ "player_id": player_id });
      const data = await res.json();
      if (data.length ===  0) {
        return null;
      } else {
        const player = data[0];
        return player;
      }
    }
    return null;
}

export const get_game_players = async (game_player_id : string): Promise<Player[]> =>{
  const req = new ApiRequest("POST", "/get_players_from_game_id.php");
  const res = await req._exec_post({ "game_id": game_player_id });
  const players : Player[]= await res.json() as Player[];
  return players;
}

export const change_player_status = async (player_id: string, status: string) =>{
  const req = new ApiRequest("POST", "/update_player.php");
  const res = await req._exec_post({ "player_id": player_id , property: 'player_status', value: status});
  const player = await res.json() as Player;
  return player;
}