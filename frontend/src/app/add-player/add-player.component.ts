import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { add_player_to_room } from '../../helpers/game_helpers';
import { check_player_existance, set_player_id_in_storage} from '../../helpers/player_helper';
import type { Game } from '../../helpers/types/apiResponsesTypes';
@Component({
  selector: 'app-add-player',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.css'
})
export class AddPlayerComponent {

  nickname = ""; // tutaj bez użycia signala, użyje go do state gry 
  // https://www.youtube.com/watch?v=W4G8VUaHZKg

  constructor(private router: Router) {
    // tutaj trzeba sprawdzić czy gracz nie jest w aktywnej grze
    // po prostu jeśli coś jest w local storage to graj, a jak nie to navigate['add_player']
    const game : Game | null = check_player_existance();
    if(game)
    {
          // przywróć grę jakoś
    }
  }

  add_player = async () =>{
    // add_player_to_rooms
    if(this.nickname.trim() != "")
    {
      const response = await add_player_to_room(this.nickname);
      const data = await response.json();
      set_player_id_in_storage(data.player_id);
      this.router.navigate(["/lobby"]);
      // tutaj nie może być nawigacja bo wtedy nie bedzie się dało przywrócić gry tak normalnie 
    } 
  }
  
}
