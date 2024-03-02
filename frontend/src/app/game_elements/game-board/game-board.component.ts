import { Component, Input } from '@angular/core';
import { Pawn, Tile } from '../../../types/gameTypes';
import { gameboard } from '../../../assets/gameboard';
import { CommonModule } from '@angular/common';
import { GameBoardTileComponent } from '../game-board-tile/game-board-tile.component';
@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [ CommonModule,GameBoardTileComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})
export class GameBoardComponent{
  @Input() board: Tile[][] = gameboard;
  @Input() player_color : string = "";
  @Input() move_pawn!: (pawn:Pawn) => void;
  @Input() throw_dice_to_child!: Function; 
  @Input() disabled: 'all' | 'none' = 'all';
  @Input() pawns: Record<string, Pawn[]> = {};
  
  throw_dice_to_grandchild = () => {
    return this.throw_dice_to_child();
  }

  move = (pawn:Pawn) => this.move_pawn(pawn)

}
  