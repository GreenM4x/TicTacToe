import { Component, OnInit } from '@angular/core';
import { GameService } from './services/game.service';
import { ComputerControllerService } from './services/computer-controler.service';
import OnlineControllerService from './services/online-controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'TicTacToe';

  gameOver: boolean = false;
  winningPlayer!: 'X' | 'O';

  private controller;

  ngOnInit(): void {
    this.controller.gameStatus.subscribe((isGameOver: boolean) => {
      console.log(isGameOver);
      this.gameOver = isGameOver;
    });

    this.controller.winningPlayer.subscribe((winningPlayer: 'X' | 'O') => {
      console.log(winningPlayer);
      this.winningPlayer = winningPlayer;
    });
  }

  constructor(
    private gs: GameService,
    private computerController: ComputerControllerService,
    private onlineController: OnlineControllerService
  ) {
    switch (this.gs.gameMode) {
      case 'local':
        this.controller = gs;
        break;
      case 'computer':
        this.controller = computerController;
        break;
      case 'online':
        this.controller = onlineController;
        break;
      default:
        this.controller = gs;
        break;
    }
  }
}
