import { Injectable } from '@angular/core';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export default class OnlineControllerService extends GameService {
  constructor() {
    super();
  }

  override play() {
    if (this.playerOneTurn) {
      this.boardArray[this.currentTileCord[0]][this.currentTileCord[1]] = 1;
      this.content = 'X';
    } else {
      this.boardArray[this.currentTileCord[0]][this.currentTileCord[1]] = -1;
      this.content = 'O';
    }
    this.playerOneTurn = !this.playerOneTurn;

    this.checkforwin();
  }
}
