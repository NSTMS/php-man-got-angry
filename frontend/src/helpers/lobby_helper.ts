import { ApiRequest } from "./api_helpers";
export const find_lobby = () => {
    const req = new ApiRequest();
    const res = req._exec_get(); // get_lobby get help pomocy nie wiem co tutaj robię
    if(res)
    {
        const game_id = create_lobby();
        set_game(game_id);
    }
    return "lobby to ty raczej nie znajdziesz"
}


export const create_lobby = () =>{
    let game_id:string = "";

    return game_id;
}

const set_game = (game_id : string) =>{
    
}
