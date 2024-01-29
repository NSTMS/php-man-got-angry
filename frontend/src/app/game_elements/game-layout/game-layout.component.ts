import { Component, OnInit } from '@angular/core';
import { protocol,host, port, dir  } from '../../../assets/connection';
import { HttpClient, HttpHeaders,HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-game-layout',
  standalone: true,
  imports: [],
  templateUrl: './game-layout.component.html',
  styleUrl: './game-layout.component.css'
})
export class GameLayoutComponent implements OnInit{
  constructor(private http: HttpClient){}
  ngOnInit(){
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
