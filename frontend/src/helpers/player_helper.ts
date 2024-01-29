import { ApiRequest } from "./api_helpers";

export const check_player_existance = (nickname: string) => {
    return true;
}

export const add_player = async (nickname:string) => {
    const req = new ApiRequest();
    req.method = "POST";
    req.mode = "text";
    req._exec_post({nickname:nickname});
}