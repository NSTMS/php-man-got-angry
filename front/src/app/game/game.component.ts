import {Component, OnInit} from '@angular/core';
import {GameboardComponent} from "../gameboard/gameboard.component";
import {StatusbarComponent} from "../statusbar/statusbar.component";
import {DiceComponent} from "../dice/dice.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    GameboardComponent,
    StatusbarComponent,
    DiceComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit{

  ngOnInit(){
  }

}
