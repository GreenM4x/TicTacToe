import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Game } from '../model/game.model';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameId: string = 'y8z0As';
  currentGame!: Game;

  emptyBoard: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  newGame!: Game;

  gameMode: 'local' | 'computer' | 'online' = 'local'; //TODO Game Select Screen

  boardArray: number[][] = new Array(3).fill(0).map(() => new Array(3).fill(0));
  currentTileCord: number[] = [0, 0];

  content: string = '';
  playerOneTurn: boolean = true;

  winningPlayer: Subject<'X' | 'O'> = new Subject();
  gameStatus: Subject<boolean> = new Subject();

  constructor(private apiService: ApiServiceService) {}
  startGame() {
    this.newGame = {
      board: this.emptyBoard,
      gameOver: false,
    };
    this.apiService
      .create(this.newGame)
      .subscribe((newGame) => console.log('New game was created'));
  }

  play() {
    if (this.playerOneTurn) {
      this.boardArray[this.currentTileCord[0]][this.currentTileCord[1]] = 1;
      this.content = 'X';
    } else {
      this.boardArray[this.currentTileCord[0]][this.currentTileCord[1]] = -1;
      this.content = 'O';
    }
    this.playerOneTurn = !this.playerOneTurn;

    this.checkForWin();
  }

  getCurrentContent() {
    return this.content;
  }
  getCurrentPlayer() {
    return this.playerOneTurn;
  }
  setCurrentTile(cTileCord: number[]) {
    this.currentTileCord = cTileCord;
  }

  checkForWin() {
    //Check for Row or Column Win
    for (let x = 0; x < 3; x++) {
      let colsum = 0;
      let rowsum = 0;
      for (let y = 0; y < 3; y++) {
        colsum += this.boardArray[y][x];
        rowsum += this.boardArray[x][y];
      }
      if (colsum === 3 || rowsum === 3) {
        this.gameStatus.next(true);
        this.winningPlayer.next('X');
      } else if (colsum === -3 || rowsum === -3) {
        this.gameStatus.next(true);
        this.winningPlayer.next('O');
      }
    }

    /* Check For Diagonal Wins */
    if (
      this.boardArray[0][0] + this.boardArray[1][1] + this.boardArray[2][2] ===
      3
    ) {
      this.gameStatus.next(true);
      this.winningPlayer.next('X');
    } else if (
      this.boardArray[0][0] + this.boardArray[1][1] + this.boardArray[2][2] ===
      -3
    ) {
      this.gameStatus.next(true);
      this.winningPlayer.next('O');
    }

    if (
      this.boardArray[2][0] + this.boardArray[1][1] + this.boardArray[0][2] ===
      3
    ) {
      this.gameStatus.next(true);
      this.winningPlayer.next('X');
    } else if (
      this.boardArray[2][0] + this.boardArray[1][1] + this.boardArray[0][2] ===
      -3
    ) {
      this.gameStatus.next(true);
      this.winningPlayer.next('O');
    }
  }
}
