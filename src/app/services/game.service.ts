import { Injectable } from '@angular/core';
import { Observable, Subject, map, pipe, retry } from 'rxjs';
import { Game } from '../model/game.model';
import { ApiServiceService } from './api-service.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  emptyBoard: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  gameId!: string;
  newGame!: Game;

  gameMode: 'local' | 'computer' | 'online' = 'local'; //TODO Game Select Screen

  boardArray: number[][] = new Array(3).fill(0).map(() => new Array(3).fill(0));
  currentTileCord: number[] = [0, 0];

  currentGame: Game = {
    board: this.boardArray,
    gameOver: false,
  };

  playerOneTurn: boolean = true;

  winningPlayer: Subject<'X' | 'O'> = new Subject();
  gameStatus: Subject<boolean> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiServiceService
  ) {}
  startGame(): Observable<string | undefined> {
    this.newGame = {
      board: this.emptyBoard,
      gameOver: false,
    };

    this.gameStatus.next(false);
    this.boardArray = new Array(3).fill(0).map(() => new Array(3).fill(0));

    return this.apiService.create(this.newGame).pipe(map((game) => game.id));
  }

  play() {
    this.apiService.readOne(this.gameId).subscribe((game) => {
      this.currentGame = game || this.currentGame;

      this.updateBoard();

      this.updateGame();

      this.playerOneTurn = !this.playerOneTurn;

      this.checkForWin();
    });
  }

  private updateGame() {
    this.currentGame = {
      board: this.boardArray,
      gameOver: false,
      id: this.gameId,
    };

    this.apiService
      .update(this.currentGame)
      .subscribe((game) => console.log(game));
  }

  private updateBoard() {
    if (this.playerOneTurn) {
      this.boardArray[this.currentTileCord[0]][this.currentTileCord[1]] = 1;
    } else {
      this.boardArray[this.currentTileCord[0]][this.currentTileCord[1]] = -1;
    }
  }

  getCurrentBoard() {
    return this.apiService
      .readOne(this.gameId)
      .pipe(map((game) => game?.board));
  }
  getCurrentPlayer() {
    return this.playerOneTurn;
  }

  setGameID(gameID: string) {
    this.gameId = gameID;
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
