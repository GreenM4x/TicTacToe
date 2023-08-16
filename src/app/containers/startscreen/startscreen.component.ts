import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss'],
})
export class StartscreenComponent {
  private gs: GameService;
  constructor(gs: GameService) {
    this.gs = gs;
  }

  create() {
    this.gs.startGame();
  }
}
