import { ApiRequest } from "./api_helpers";
import type { Game, Player } from "./types/apiResponsesTypes";
import { find_game } from "./game_helpers";

export const check_player_existance = (): Game | null =>{
    let response = null;
    (async()=>{
        const player : Player | null = get_player_by_id();
        if(player){
          const res = await find_game(player.player_id);
          const data = await res.json();
          console.log(data);
          response = data;
        };     
      })();
      return response;
}

export const get_player_by_id = () : Player | null => {
    const player_id = sessionStorage.getItem("player_id");
    let response = null;
    if(player_id)
    {
        (async()=>{
            const req = new ApiRequest("POST","/get_player.php");
            const res = await req._exec_post({"player_id":player_id});
            const data = await res.json();
            if(data.length == 0) response = null;
            else{
                response = data[0];
                console.log(response);
            } 
        })()
    }
    return response;
}

export const set_player_id_in_storage = (player_id : string) => sessionStorage.setItem("player_id", player_id);