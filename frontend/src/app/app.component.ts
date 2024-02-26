import { Component, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { add_player_to_room, get_game_players, change_player_status} from '../helpers/player_helper';
import type { Game, GameAndPlayerData, Player } from '../types/apiResponsesTypes';
import { gameboard } from '../assets/gameboard';
import { GamePath, Tile } from '../types/gameTypes';
import { GameBoardComponent } from './game_elements/game-board/game-board.component';
import { check_game_start, find_game, set_ctx_props, start_refresh_data_interval } from '../helpers/game_helpers';
import { FormsModule } from '@angular/forms';
import { get_session_id } from '../helpers/sessions_helper';
import { play_sound } from '../helpers/speech_helper';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, HttpClientModule, GameBoardComponent, FormsModule]
})
export class AppComponent{
    game_board: Tile[][] = gameboard;
    nickname = signal("");
    game : Game | null = null;
    game_path : GamePath = {} as GamePath;
    player_color : string = "";
    disabled: 'all' | 'none' = 'all';
    players : Player[] = [];
    current_player : Player | null = null;
    player_status: boolean = false; 

    constructor() {
      (async () => {
        const session_id = get_session_id();
        const restored_game : GameAndPlayerData | null = await find_game(session_id);
        if (restored_game) {
          set_ctx_props(this, restored_game);
          await start_refresh_data_interval(this);
        }
      })();
    }

    
    nickname_change = (event: Event) =>{
      this.nickname.set((event.target as HTMLInputElement).value)
    }
  
    add_player = async () =>{
      if(this.nickname().trim() != "")
      {
        const data = await add_player_to_room(this.nickname());
        set_ctx_props(this, data);
        await start_refresh_data_interval(this);

      } 
    }

    change_status = async (event: Event) =>{
      const checked: boolean = (event.target as HTMLInputElement).checked;
      this.player_status = checked;
      const status : string = checked ? "in_lobby_ready" : "in_lobby_not_ready";
      await change_player_status(this.current_player!.player_id,status);
      this.players = [... await get_game_players(this.game!.game_id)];
      const can_start = await check_game_start(this.game!.game_id);

      if(can_start){
        console.log("game started")
      }
    }

    
    throw_dice = (event: Event) =>{
      if(this.current_player!.player_status !== "in_game_moving") return;
      console.log(this.current_player)
      const rand = Math.floor(Math.random() * 6 + 1) // rzut kostką
      play_sound(rand.toString());

      console.log(rand)    
      if(this.disabled === 'all' && (rand === 6 || rand === 1))
      {
        console.log("możesz wyjść z bazy");
        this.highlight_move();
      }
    }


    highlight_move = () =>{
      // tutaj szara kropka gdzie możesz się ruszyć
      // ale tutaj jeszcze musi być obsługa tego że możesz wyjść pionkiem z bazy
    }


    move_figure = (figure: Tile) =>{
      // ruch pionkiem
      const dest_position = 0; // figure.position + oczka z kostki
      // zmień w game_state POST /update_game.php {{ game_id, game_state }}  
    }

    check_collision = (dest_position: number) =>{
      let collision = false;
      return collision;
    }

}
