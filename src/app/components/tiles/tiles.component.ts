import { Component, Input, OnInit } from '@angular/core';
import { ComputerControllerService } from 'src/app/services/computer-controler.service';
import { GameService } from 'src/app/services/game.service';
import OnlineControllerService from 'src/app/services/online-controller.service';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss'],
})
export class TilesComponent implements OnInit {
  @Input() coords!: { x: number; y: number };
  private controller;
  currentboard!: number[][] | undefined;
  content: string = '';
  beenPressed: boolean = false;
  playerOneTurn: boolean = true;

  ngOnInit(): void {
    this.controller.getCurrentBoard().subscribe((board) => {
      this.currentboard = board;
      this.checkfortiles();
    });
  }

  checkfortiles() {
    if (
      this.currentboard &&
      this.currentboard[this.coords.x][this.coords.y] === 1
    ) {
      this.content = 'X';
    } else if (
      this.currentboard &&
      this.currentboard[this.coords.x][this.coords.y] === -1
    ) {
      this.content = 'O';
    } else {
      this.content = '';
    }

    console.log(this.currentboard);
    console.log(this.content);
  }
  setTile() {
    this.controller.setCurrentTile([this.coords.x, this.coords.y]);

    this.controller.play();
    this.controller
      .getCurrentBoard()
      .subscribe((board) => (this.currentboard = board));
    this.beenPressed = true;
    this.playerOneTurn = this.controller.getCurrentPlayer();
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
