import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-player',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.css'
})
export class AddPlayerComponent {

  nickname: string = "";

  constructor(private router: Router) {}

  add_player(){
    this.router.navigate(["/lobby"]);
  }
}
