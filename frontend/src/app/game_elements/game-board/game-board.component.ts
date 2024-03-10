import { Component, Input } from '@angular/core';
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
  @Input() highlight_move!: (pawn:Pawn) => void;
  @Input() remove_highlight_from_pawn!: (pawn: Pawn) => void;

  throw_dice_to_grandchild = () => this.throw_dice_to_child();

  show_possible_move = (pawn:Pawn) => this.highlight_move(pawn);
  
  move = (pawn:Pawn) => this.move_pawn(pawn)

}
  