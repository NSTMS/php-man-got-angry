import {Component, OnInit} from '@angular/core';
import {join} from "@angular/compiler-cli";

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css'
})
export class LobbyComponent implements OnInit{
  join_room():void{
    sessionStorage.setItem("session_id","jakiś ciąg znaków");
  }
  ngOnInit(){

  }
}
