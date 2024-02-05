import { ApiRequest } from "./api_helpers";

// to wsm nie jest potrzebne bo sprawdzamy ssid a nie nick
export const check_player_existance = (nickname: string) => {
    const req = new ApiRequest("GET",[{"get":"players"}],"json");
    req._exec_get();
    return false;
}

export const add_player = async (nickname:string) => {
    const req = new ApiRequest("POST",[],"text");
    return req._exec_post({nickname:nickname}); // return ssid
}

export const delete_player = async(ssid: string) =>{
    const req = new ApiRequest("DELETE",[],"json");
    req._exec_post({ssid: ssid });
    return true;
}