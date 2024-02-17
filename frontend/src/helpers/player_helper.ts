import { ApiRequest } from "./api_helpers";
import type { Game, Player, GameAndPlayerData} from "../types/apiResponsesTypes";
import { find_game } from "./game_helpers";


export const check_player_existance = async (): Promise<GameAndPlayerData | null> => {
    const player: Player | null = await get_player_by_id();
    if (player) {
      const res = await find_game(player.player_id);
      sessionStorage.setItem("player_id", player.player_id);
      const data = await res.json();
      return { game: data, player_color: player.player_color, player_id: player.player_id };
    }
    return null;
  };


export const add_player_to_room = async (player_name: string) =>{
    const req = new ApiRequest("POST" ,"/add_player_to_room.php");
    const res = await req._exec_post({ "player_name":player_name })
    const data = await res.json() as GameAndPlayerData;
    sessionStorage.setItem("player_id", data.player_id);
    return data;
}

export const get_player_by_id = async (): Promise<Player | null> => {
    const player_id = sessionStorage.getItem("player_id");
    if (player_id) {
      const req = new ApiRequest("POST", "/get_player.php");
      const res = await req._exec_post({ "player_id": player_id });
      const data = await res.json();
      if (data.length ===  0) {
        return null;
      } else {
        const player = data[0];
        console.log(player);
        return player;
      }
    }
    return null;
  };
