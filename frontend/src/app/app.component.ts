import { Component, ViewChild, ElementRef, signal, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { check_player_existance, add_player_to_room, get_game_players, get_player_by_id, change_player_status} from '../helpers/player_helper';
import type { Game, GameAndPlayerData, Player } from '../types/apiResponsesTypes';
import { game_paths, gameboard } from '../assets/gameboard';
import { GamePath, Tile } from '../types/gameTypes';
import { GameBoardComponent } from './game_elements/game-board/game-board.component';
import { check_game_start } from '../helpers/game_helpers';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, HttpClientModule, GameBoardComponent]
})
export class AppComponent{
    game_board: Tile[][] = gameboard;
    nickname = signal("");
    game : Game | null = null;
    game_path : GamePath | null = null;
    player_color : string = "";
    disabled: 'all' | 'none' = 'all';
    players : Player[] = [];
    current_player : Player | null = null;


    constructor() {
      (async () => {
        const restored_game : GameAndPlayerData | null = await check_player_existance();
        if (restored_game) {
          console.log(restored_game)
          // Restore the game or perform some action
          this.game = structuredClone(restored_game.game);
          this.player_color = localStorage.getItem("player_color") || "";
          this.game_path = game_paths[this.player_color];
          this.disabled = this.game.game_status === 'in_progress' ? "all" : 'none'
          this.players = [... await get_game_players(restored_game.game.game_id)];
          this.current_player = await get_player_by_id();
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
        console.log(data);
        this.game = {... data.game};
        this.game_path = game_paths[data.player_color];
        this.player_color = data.player_color;
        this.players = [... await get_game_players(data.game.game_id)];
        this.current_player = await get_player_by_id();
        localStorage.setItem("player_color", this.player_color);

      } 
    }

    change_status = async (event: Event) =>{
      const checked: boolean = (event.target as HTMLInputElement).checked;
      const status : string = checked ? "in_lobby_ready" : "in_lobby_not_ready"
      await change_player_status(this.current_player!.player_id,status);
      const can_start = await check_game_start(this.game!.game_id);
      if(can_start){
        console.log("game started")
      }
    }

    
    throw_dice = (event: Event) =>{
      if(this.current_player?.player_status !== "in_game_moving") return;
      const rand = Math.floor(Math.random() * 6 + 1) // rzut kostką
      this.play_sound(rand.toString());

      console.log(rand)    
      if(this.disabled === 'all' && (rand === 6 || rand === 1))
      {
        console.log("możesz wyjść z bazy");
        this.highlight_move();
      }
    }

    play_sound = (text: string) =>{
      const lang = localStorage.getItem('lang');
      // zagraj dźwięk

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
