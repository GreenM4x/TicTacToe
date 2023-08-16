import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss'],
})
export class StartscreenComponent {
  /* gameid: string; */

  constructor(private gs: GameService, private router: Router) {}

  create() {
    this.gs.startGame().subscribe((id) => {
      this.router.navigate([id]);
    });
  }
}
