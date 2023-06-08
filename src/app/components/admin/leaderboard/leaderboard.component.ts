import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {
  players$: Observable<User[]>;

  constructor(private userService: UserService) {
    this.players$ = this.userService.getPlayers();
  }

}
