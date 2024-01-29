import { Routes } from '@angular/router';
import { AddPlayerComponent } from './add-player/add-player.component';
import { GameLayoutComponent } from './game_elements/game-layout/game-layout.component';
import { LobbyComponent } from './lobby_elements/lobby/lobby.component';
export const routes: Routes = [
    {path:"", component:AddPlayerComponent},
    {path: "lobby", component: LobbyComponent},
    {path: "game", component: GameLayoutComponent},
    { path: '**', component:AddPlayerComponent }
];
