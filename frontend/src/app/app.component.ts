import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { protocol,host, port, dir } from '../assets/connection';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
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
  }}
