import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import type { Tile } from '../../../types/gameTypes';
import { Player } from '../../../types/apiResponsesTypes';
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
  @Input() player_color : string = "";
  index : number = 0;
  @Input() throw_dice_to_grandchild!: Function; // Make it non-null with assertion

  invokeParentFunction = () => {
    console.log('clicked from GameBoardTile');
    this.throw_dice_to_grandchild();
  }

  ngOnInit(): void {
    this.index = this.i*11 + this.j;
  }


}
