import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() throw_dice_to_child!: Function; 
  @Input() disabled: 'all' | 'none' = 'all';
  
  throw_dice_to_grandchild = () => {
    console.log('triggered from GameBoard');
    this.throw_dice_to_child();
  }

}
  