import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { add_player_to_room, get_game_players, change_player_status } from '../helpers/player_helper';
import type { GameAndPlayerData, PlayerPawns } from '../types/apiResponsesTypes';
import { gameboard } from '../assets/gameboard';
import { Game, Pawn, Tile } from '../types/gameTypes';
import { GameBoardComponent } from './game_elements/game-board/game-board.component';
import { check_game_start, find_game, set_ctx_props, start_refresh_data_interval, update_game } from '../helpers/game_helpers';
import { FormsModule } from '@angular/forms';
import { get_session_id } from '../helpers/sessions_helper';
import { play_sound } from '../helpers/speech_helper';
import { get_pawn_game_path, move_pawn_by_steps, show_possible_move } from '../helpers/move_helper';
import { ApiRequest } from '../helpers/api_helpers';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, GameBoardComponent, FormsModule]
})

export class AppComponent implements OnInit {
 game_board: Tile[][] = gameboard;
 nickname = signal('');
 game: Game | null = null;
 players_pawns: PlayerPawns = {};
 voicesArray: SpeechSynthesisVoice[] = [];
 dice_value: number | null = null;
 can_throw_dice: boolean = true;

 ngOnInit() {
    this.initializeGame();
    this.populateVoiceList();
 }

 async initializeGame() {
    try {
      const session_id = get_session_id();
      const restored_game: GameAndPlayerData | null = await find_game(session_id);
      if (restored_game) {
        await set_ctx_props(this, restored_game);
        await start_refresh_data_interval(this);
      }
    } catch (error) {
      console.error('Error initializing game:', error);
    }
 }

 populateVoiceList = () => {
    this.voicesArray = speechSynthesis.getVoices();
    console.log(this.voicesArray);
 }

 nickname_change = (event: Event) => {
    this.nickname.set((event.target as HTMLInputElement).value);
 }

 async add_player() {
    if (this.nickname().trim() === "") return;
    try {
      const data = await add_player_to_room(this.nickname());
      await set_ctx_props(this, data);
      await start_refresh_data_interval(this);
    } catch (error) {
      console.error('Error adding player:', error);
    }
 }

 async change_status(event: Event) {
    const checked: boolean = (event.target as HTMLInputElement).checked;
    this.game!.player_status = checked;
    const status: string = checked ? "in_lobby_ready" : "in_lobby_not_ready";
    try {
      await change_player_status(this.game!.current_player!.player_id, status);
      this.game!.players = [... await get_game_players(this.game!.game_id)];
      if (!checked) return;
      await check_game_start(this.game!.game_id);
    } catch (error) {
      console.error('Error changing player status:', error);
    }
 }


  throw_dice = () => {
    console.log("---------------");
    
    if (!this.can_throw_dice) return;
    else console.log("can_throw_dice", this.can_throw_dice);
    this.can_throw_dice = false;

    if (this.dice_value) return;
    if (this.game!.current_player!.player_status !== "in_game_moving") return;
    else  console.log("player_status", this.game!.current_player!.player_status);
    if (this.game!.current_player!.player_color !== this.game!.player_color) return;
    else console.log("player_color", this.game!.current_player!.player_color);
    this.dice_value = Math.floor(Math.random() * 6 + 1);
    console.log("dice_value", this.dice_value);
    const req = new ApiRequest("POST", "/has_moved.php");
    req._exec_post({ "game_id": this.game!.game_id, "has_moved": true });
    
    play_sound(this.dice_value!.toString());
    const dice = this.game_board.flat().find(tile => tile.role === "dice");
    dice!.background_color = this.dice_value!.toString();
    if (!this.check_if_player_can_move(this.game!.current_player!.player_color, this.dice_value!)) {
      (async () => {
        this.players_pawns = await update_game(this);
      })();
      this.dice_value = null;
      dice!.background_color = "";
    } 
  }

  check_if_player_can_move = (color: string, steps: number): boolean => {
    const pawns = this.players_pawns[color];
    const path = get_pawn_game_path(color).game_path;
    let counter = 0;
    pawns.forEach(pawn => {
      if (pawn.status === "in_home" && (steps === 6 || steps === 1)) counter += 1;
      if (pawn.status === "in_game" && path.indexOf(pawn.pos) + steps <= 43) counter += 1;
    })
  
    return counter > 0;
  }
  

  move_pawn = async (pawn: Pawn) => {
    if (!this.dice_value) return;
    if (this.game!.current_player!.player_status !== "in_game_moving") return;
    if (this.game!.current_player!.player_color !== pawn.color) return;
    if ((this.dice_value !== 6 && this.dice_value !== 1) && pawn.status === "in_home") return;
    if ((this.dice_value === 6 || this.dice_value === 1) && pawn.status === "in_home") this.dice_value = 0;  

    this.players_pawns = await move_pawn_by_steps(this, pawn, this.dice_value!);
    this.remove_highlight_from_pawn(pawn);
    const dice = this.game_board.flat().find(tile => tile.role === "dice");

    this.dice_value = null; 
    dice!.background_color = "";
  }

  remove_highlight_from_pawn = (pawn: Pawn) => {
    const possible_pos = show_possible_move(this, pawn, this.dice_value!);
    this.game_board.flat()[possible_pos].type = "tile"
  }

  highlight_move = (pawn: Pawn) => {
    if (this.game!.current_player!.player_status !== "in_game_moving") return;
    if (this.game!.current_player!.player_color !== pawn.color) return;
    let val = this.dice_value;
    if (!val) return;
    if ((val === 6 || val === 1) && pawn.status === "in_home") val = 0;
    else if ((val !== 6 && val !== 1) && pawn.status === "in_home") return;
    const possible_pos = show_possible_move(this, pawn, val!);
    this.game_board.flat()[possible_pos].type = "highlight"
  }


}
