import { Component, Input, OnInit } from '@angular/core';
import type { Tile } from '../../../types/gameTypes';
import { Player } from '../../../types/apiResponsesTypes';
@Component({
  selector: 'app-game-board-tile',
  standalone: true,
  imports: [],
  templateUrl: './game-board-tile.component.html',
  styleUrl: './game-board-tile.component.css'
})
export class GameBoardTileComponent implements OnInit {
  @Input() tile: Tile = {} as Tile;
  @Input() i: number = 0;
  @Input() j: number = 0;
  @Input() player_color : string = "";
  @Input() throw_dice_in_grand_child : () => void;
  




}
