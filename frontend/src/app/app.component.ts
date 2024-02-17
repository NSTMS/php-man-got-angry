import { Component, Input, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { check_player_existance, add_player_to_room} from '../helpers/player_helper';
import type { Game, GameAndPlayerData } from '../types/apiResponsesTypes';
import { game_paths, gameboard } from '../assets/gameboard';
import { GamePath, Tile } from '../types/gameTypes';
import { GameBoardComponent } from './game_elements/game-board/game-board.component';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, HttpClientModule, GameBoardComponent]
})
export class AppComponent {
    game_board: Tile[][] = gameboard;
    nickname = signal("");
    game : Game | null = null;
    game_path : GamePath | null = null;
    game_state: Tile[][] = [];
    player_color : string = "";
    
    constructor() {
      (async () => {
        const restored_game : GameAndPlayerData | null = await check_player_existance();
        if (restored_game) {
          console.log(restored_game)
          // Restore the game or perform some action
          this.game = structuredClone(restored_game.game);
          this.player_color = sessionStorage.getItem("player_color") || "";
          this.game_path = game_paths[this.player_color];
        }
      })();
    }

    
    nickname_change(event: Event)
    {
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
        sessionStorage.setItem("player_color", this.player_color);
      } 
    }
    random_number_from_range(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }

    throw_dice = () =>{
      const rand = this.random_number_from_range(1,6); // rzut kostką
      // zagraj dźwięk
    
    }


    simulate_move = () =>{
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
