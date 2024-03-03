import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Game, Pawn, Tile } from '../../../types/gameTypes';
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
  @Input() game : Game = {} as Game;
  @Input() move_pawn!: (pawn:Pawn) => void;
  @Input() players_pawns: Record<string, Pawn[]> = {};
  @Input() throw_dice_to_child!: Function; 
  
  throw_dice_to_grandchild = () => {
    return this.throw_dice_to_child();
  }

  move = (pawn:Pawn) => this.move_pawn(pawn)

}
  