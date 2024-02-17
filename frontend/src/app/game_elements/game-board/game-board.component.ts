import { Component, Input } from '@angular/core';
import { Tile } from '../../../types/gameTypes';
import { gameboard } from '../../../assets/gameboard';
import { CommonModule } from '@angular/common';
import { GameBoardTileComponent } from '../game-board-tile/game-board-tile.component';
import { Player } from '../../../types/apiResponsesTypes';
@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [ CommonModule,GameBoardTileComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})
export class GameBoardComponent {
  @Input() board: Tile[][] = gameboard;
  @Input() player_color : string = "";
  @Input() throw_dice_in_child : () => void;

  throw_dice_in_child_callback() {
    this.throw_dice_in_child(); 
  }
  constructor(){}
}
