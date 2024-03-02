import { Component, OnInit, signal,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { add_player_to_room, get_game_players, change_player_status} from '../helpers/player_helper';
import type { GameAndPlayerData } from '../types/apiResponsesTypes';
import { gameboard } from '../assets/gameboard';
import { Game, Pawn, Tile } from '../types/gameTypes';
import { GameBoardComponent } from './game_elements/game-board/game-board.component';
import { check_game_start, find_game, set_ctx_props, start_refresh_data_interval, update_game } from '../helpers/game_helpers';
import { FormsModule } from '@angular/forms';
import { get_session_id } from '../helpers/sessions_helper';
import { play_sound } from '../helpers/speech_helper';
import { move_pawn_by_steps, move_pawn_to_starting_point } from '../helpers/move_helper';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, HttpClientModule, GameBoardComponent, FormsModule]
})
export class AppComponent implements OnInit{
    game_board: Tile[][] = gameboard;
    nickname = signal("");
    game : Game | null = null;
    voicesArray : SpeechSynthesisVoice[] = [];
    dice_value : number | null = null;
    constructor(public cdr: ChangeDetectorRef) { }
    ngOnInit() {
      (async () => {
        const session_id = get_session_id();
        const restored_game : GameAndPlayerData | null = await find_game(session_id);
        if (restored_game) {
          await set_ctx_props(this, restored_game,this.cdr);
          await start_refresh_data_interval(this);
        }
      })();

      this.voicesArray = speechSynthesis.getVoices();
      console.log(this.voicesArray);
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = this.populateVoiceList;
      }

    }

    populateVoiceList = () => {
      this.voicesArray = speechSynthesis.getVoices();
      console.log(this.voicesArray);
    }
    
    nickname_change = (event: Event) =>{
      this.nickname.set((event.target as HTMLInputElement).value)
    }
  
    add_player = async () =>{
      if(this.nickname().trim() != "")
      {
        const data = await add_player_to_room(this.nickname());
        set_ctx_props(this, data,this.cdr);
        await start_refresh_data_interval(this);

      } 
    }

    change_status = async (event: Event) =>{
      const checked: boolean = (event.target as HTMLInputElement).checked;
      this.game!.player_status = checked;
      const status : string = checked ? "in_lobby_ready" : "in_lobby_not_ready";
      await change_player_status(this.game!.current_player!.player_id,status);
      this.game!.players = [... await get_game_players(this.game!.game_id)];
      if(!checked) return;
      const can_start = await check_game_start(this.game!.game_id);
      if(can_start){
        console.log("game started")
      }
    }

    
    throw_dice = () =>{
      if(this.game!.current_player!.player_status !== "in_game_moving") return;
      this.dice_value = Math.floor(Math.random() * 6 + 1);
      play_sound(this.dice_value.toString());
      this.highlight_move();
    }

    move_pawn = (pawn:Pawn) =>{
      if(this.game!.current_player!.player_status !== "in_game_moving") return;
      if(!this.dice_value) return;
      let new_pawns;
      if((this.dice_value === 6 || this.dice_value === 1) && pawn.status === "in_home")
      {
        new_pawns = structuredClone(move_pawn_to_starting_point(this.game!.players_pawns, pawn));
      }
      else{
        new_pawns = structuredClone(move_pawn_by_steps(this.game!.players_pawns, pawn, this.dice_value!));
      }
      update_game(this, new_pawns);

      this.dice_value = null;
      
    }



    highlight_move = () =>{
      // tutaj szara kropka gdzie możesz się ruszyć
      // ale tutaj jeszcze musi być obsługa tego że możesz wyjść pionkiem z bazy
    }

}
