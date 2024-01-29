import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { protocol,host, port, dir } from '../assets/connection';
import { HttpClient, HttpHeaders,HttpClientModule } from '@angular/common/http';
import { GameLayoutComponent } from "./game_elements/game-layout/game-layout.component";
import { AddPlayerComponent } from "./add-player/add-player.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, HttpClientModule, GameLayoutComponent, AddPlayerComponent]
})
export class AppComponent {}
