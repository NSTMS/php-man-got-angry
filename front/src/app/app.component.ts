import {Component, OnInit,WritableSignal,signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {LobbyComponent} from "./lobby/lobby.component";
import {GameComponent} from "./game/game.component";
import { host, protocol, port,dir } from '../assets/consts/connection';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LobbyComponent, GameComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'pomocy co ja tutaj robię';
  in_progress: WritableSignal<boolean> = signal(false);

  constructor(private http: HttpClient) {}

  ngOnInit(){
    if(sessionStorage.getItem("session_id")){
      this.in_progress.set(true);
    }
    const headers = new HttpHeaders()
    .set('mode','cors')
    .set('Access-Control-Allow-Origin','*')
    .set('Access-Control-Allow-Headers','*')
    .set("Content-Type","application/json")
    
    this.http.get(`${protocol}://${host}:${port}/${dir}`, { headers: headers, observe: 'response' })
    .subscribe((response: any) => {
     console.log(response.body);
    })
  }

}
