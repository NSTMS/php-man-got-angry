import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { add_player_to_room, get_game_players, change_player_status } from '../helpers/player_helper';
import type { GameAndPlayerData, PlayerPawns } from '../types/apiResponsesTypes';
import { gameboard } from '../assets/gameboard';
import { Game, Pawn, Tile } from '../types/gameTypes';
import { GameBoardComponent } from './game_elements/game-board/game-board.component';
import { check_game_start, find_game, set_ctx_props, start_refresh_data_interval, update_game } from '../helpers/game_helpers';
import { FormsModule } from '@angular/forms';
import { get_session_id } from '../helpers/sessions_helper';
import { play_sound } from '../helpers/speech_helper';
import { move_pawn_by_steps, show_possible_move } from '../helpers/move_helper';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, HttpClientModule, GameBoardComponent, FormsModule]
})

export class AppComponent implements OnInit {
  game_board: Tile[][] = gameboard;
  nickname = signal("");
  game: Game | null = null;
  players_pawns: PlayerPawns = {};
  voicesArray: SpeechSynthesisVoice[] = [];
  dice_value: number | null = null;
  can_throw_dice: boolean = true;

  ngOnInit() {
    (async () => {
      const session_id = get_session_id();
      const restored_game: GameAndPlayerData | null = await find_game(session_id);
      if (restored_game) {
        await set_ctx_props(this, restored_game);
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

  nickname_change = (event: Event) => {
    this.nickname.set((event.target as HTMLInputElement).value)
  }

  add_player = async () => {
    if (this.nickname().trim() == "") return;
    const data = await add_player_to_room(this.nickname());
    set_ctx_props(this, data);
    await start_refresh_data_interval(this);
  }

  change_status = async (event: Event) => {
    const checked: boolean = (event.target as HTMLInputElement).checked;
    this.game!.player_status = checked;
    const status: string = checked ? "in_lobby_ready" : "in_lobby_not_ready";
    await change_player_status(this.game!.current_player!.player_id, status);
    this.game!.players = [... await get_game_players(this.game!.game_id)];
    if (!checked) return;
    await check_game_start(this.game!.game_id);
  }


  throw_dice = () => {
    if(!this.can_throw_dice) return;
    if (this.game!.current_player!.player_status !== "in_game_moving") return;
    if (this.game!.current_player!.player_color !== this.game!.player_color) return;
    this.dice_value = Math.floor(Math.random() * 6 + 1);
    play_sound(this.dice_value.toString());
    const dice = this.game_board.flat().find(tile => tile.role === "dice");
    dice!.background_color = this.dice_value.toString();
    this.can_throw_dice = false;
  }

  move_pawn = async (pawn: Pawn) => {
    if (this.game!.current_player!.player_status !== "in_game_moving") return;
    if (this.game!.current_player!.player_color !== pawn.color) return;
    if ((this.dice_value === 6 || this.dice_value === 1) && pawn.status === "in_home") this.dice_value = 0;
    else if ((this.dice_value !== 6 && this.dice_value !== 1) && pawn.status === "in_home") 
    {
      this.dice_value = null;
      const dice = this.game_board.flat().find(tile => tile.role === "dice");
      dice!.background_color = "";
      const pawns = await update_game(this);
      this.players_pawns = pawns;

    }
    (async () => {
      this.players_pawns = await move_pawn_by_steps(this, pawn, this.dice_value!);
    })()

    this.remove_highlight_from_pawn(pawn);
    this.dice_value = null;
    const dice = this.game_board.flat().find(tile => tile.role === "dice");
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
    if (pawn.status == 'in_finish') return;
    if ((val === 6 || val === 1) && pawn.status === "in_home") val = 0;
    else if ((val !== 6 && val !== 1) && pawn.status === "in_home") return;
    const possible_pos = show_possible_move(this, pawn, val!);
    this.game_board.flat()[possible_pos].type = "highlight"
    console.log(possible_pos)
  }


}
