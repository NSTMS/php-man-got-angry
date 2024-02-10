import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GameLayoutComponent } from "./game_elements/game-layout/game-layout.component";
import { AddPlayerComponent } from "./add-player/add-player.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, HttpClientModule, GameLayoutComponent, AddPlayerComponent]
})
export class AppComponent {
    // tutaj chyba w przyszłości będzie logika z dodawania gracza / przywracania go do gry
}
