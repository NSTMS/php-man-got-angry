import { Component, Input, OnInit } from '@angular/core';
import type { Pawn, Tile } from '../../../types/gameTypes';
import { Player } from '../../../types/apiResponsesTypes';
import { move_pawn_by_steps } from '../../../helpers/move_helper';
@Component({
  selector: 'app-game-board-tile',
  standalone: true,
  imports: [],
  templateUrl: './game-board-tile.component.html',
  styleUrl: './game-board-tile.component.css'
})
export class GameBoardTileComponent implements OnInit{
  @Input() tile: Tile = {} as Tile;
  @Input() i: number = 0;
  @Input() j: number = 0;
  index : number = 0;
  @Input() move_pawn!: (pawn:Pawn) => void;
  @Input() throw_dice_to_grandchild!: Function // Make it non-null with assertion
  @Input() pawns:  Record<string, Pawn[]> = {} as Record<string, Pawn[]>;
  @Input() player_color: string = "";

  pawn : Pawn | null = null;
  rand: number = 0;
  player_pawns: Pawn[] = [];

  invokeParentFunction = () => {
    console.log('clicked from GameBoardTile');
    this.throw_dice_to_grandchild();
    
  }

  ngOnInit(): void {
    this.index = this.i*11 + this.j;
    this.player_pawns = Object.values(this.pawns).flat();
    console.log('here i am')
    if(this.player_pawns.map(pawn => pawn.pos).includes(this.index))
    {
      const ind = this.player_pawns.map(p => p.pos).indexOf(this.index);
      this.pawn = this.player_pawns[ind];
    }
  }
  
  move = () => {
    console.log(this.pawn!)
    this.move_pawn(this.pawn!);
  }


}
