import {Component, OnInit} from '@angular/core';
import {FieldComponent} from "../field/field.component";
import {Field} from "../../assets/types/field";
import {get_board} from "../../assets/Board";

@Component({
  selector: 'app-gameboard',
  standalone: true,
  imports: [
    FieldComponent
  ],
  templateUrl: './gameboard.component.html',
  styleUrl: './gameboard.component.css'
})
export class GameboardComponent implements OnInit {
  fields:Field[] = get_board();

  ngOnInit(){
   console.log(this.fields)
  }

}
