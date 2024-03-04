import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import type { Game, Pawn, Tile } from '../../../types/gameTypes';
import { Player } from '../../../types/apiResponsesTypes';
import { move_pawn_by_steps } from '../../../helpers/move_helper';
@Component({
  selector: 'app-game-board-tile',
  standalone: true,
  imports: [],
  templateUrl: './game-board-tile.component.html',
  styleUrl: './game-board-tile.component.css'
})
export class GameBoardTileComponent implements OnInit, OnChanges{
  @Input() i: number = 0;
  @Input() j: number = 0;
  index : number = 0;
  @Input() tile: Tile = {} as Tile;
  @Input() game : Game = {} as Game;
  @Input() players_pawns: Record<string, Pawn[]> = {};

  @Input() move_pawn!: (pawn:Pawn) => void;
  @Input() throw_dice_to_grandchild!: Function // Make it non-null with assertion

  pawns_on_tile : Pawn[] = [];
  rand: number = 0;
  pawns: Pawn[] = [];

  invokeParentFunction = () => {
    console.log('clicked from GameBoardTile');
    this.throw_dice_to_grandchild();
    
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes['players_pawns']) this.assign_pawn();
  }
  
  ngOnInit(): void {
    this.index = this.i*11 + this.j;
    this.assign_pawn();
  }


  assign_pawn = () => {
    this.pawns = Object.values(this.players_pawns).flat();
    this.pawns_on_tile = [];

    this.pawns.filter(p => p.pos == this.index).forEach(p =>{
      const ind = this.pawns.indexOf(p);
      this.pawns_on_tile.push(this.pawns[ind]);
    })

  }
  
  move = (pawn: Pawn) => {
    console.log(this.pawns_on_tile!)
    this.move_pawn(pawn);
  }


}
