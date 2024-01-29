import { ApiRequest } from "./api_helpers";

export class GameController{

    request: ApiRequest;

    constructor()
    {
        this.request = new ApiRequest();
    }

    _restore_game(game_id: string)
    {
        const game = this._game_exists(game_id); // nw logike trzeba bedzie tu zmienić
        return game ? game: false;
    }

    _game_exists(game_id : string)
    {
        return this.request._exec_get([{"game_id":game_id}]); 
    }



}