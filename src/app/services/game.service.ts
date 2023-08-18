import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Game } from '../model/game.model';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  currentContent: string = '';

  gameId!: string;
  newGame!: Game;

  isBotGame!: boolean;
  isBotTurn: boolean = true;

  boardArray: number[][] = new Array(3).fill(0).map(() => new Array(3).fill(0));
  currentTileCord: number[] = [0, 0];

  playerOneTurn!: boolean;

  currentGame: Game = {
    board: this.boardArray,
    gameOver: false,
    currentPlayerOne: this.playerOneTurn,
  };

  winningPlayer: Subject<'X' | 'O'> = new Subject();
  gameStatus: Subject<boolean> = new Subject();

  constructor(private apiService: ApiServiceService) {}

  startGame(): Observable<string | undefined> {
    this.isBotGame = false;
    this.playerOneTurn = true;

    this.boardArray = new Array(3).fill(0).map(() => new Array(3).fill(0));

    this.newGame = {
      board: this.boardArray,
      gameOver: false,
      currentPlayerOne: true,
    };

    this.gameStatus.next(false);

    return this.apiService.create(this.newGame).pipe(map((game) => game.id));
  }

  startBotGame() {
    this.isBotGame = true;
    this.playerOneTurn = true;
    this.boardArray = new Array(3).fill(0).map(() => new Array(3).fill(0));

    this.newGame = {
      board: this.boardArray,
      gameOver: false,
      currentPlayerOne: true,
    };

    this.gameStatus.next(false);
  }

  setToBot() {
    this.isBotGame = true;
  }

  play() {
    if (this.isBotGame) {
      this.PlayBot();
      return;
    }
    this.getCurrentPlayer().subscribe((player) => {
      this.playerOneTurn = player || this.playerOneTurn;
    });

    this.apiService.readOne(this.gameId).subscribe((game) => {
      this.currentGame = game || this.currentGame;

      this.updateBoard();
      this.playerOneTurn = !this.playerOneTurn;

      let isGameOver: boolean = false;
      this.gameStatus.subscribe((status) => (isGameOver = status));
      this.checkForWin();

      if (!isGameOver) {
        this.updateGame(false);
      }
    });
  }

  PlayBot() {
    this.updateBoard();
    this.playerOneTurn = !this.playerOneTurn;

    let isGameOver: boolean = false;
    this.gameStatus.subscribe((status) => (isGameOver = status));
    this.checkForWin();

    if (!isGameOver) {
      this.updateGame(false);
    }

    if (this.isBotTurn) {
      this.botsMove();
    }

    this.isBotTurn = true;
  }

  botsMove() {
    this.isBotTurn = false;
    let randomX = Math.floor(Math.random() * 3);
    let RandomY = Math.floor(Math.random() * 3);

    console.log(this.boardArray);
    if (!this.chechForSpace(randomX, RandomY)) {
      this.botsMove();
      return;
    }
    this.setCurrentTile([randomX, RandomY]);
    this.play();
  }

  chechForSpace(x: number, y: number): boolean {
    if (this.boardArray[x][y]) {
      console.log('No space at: ' + x + ' ' + y);
      return false;
    }
    return true;
  }
  private updateGame(isOver: boolean) {
    this.currentGame = {
      board: this.boardArray,
      gameOver: isOver,
      id: this.gameId,
      currentPlayerOne: this.playerOneTurn,
    };

    if (this.isBotGame) return;
    this.apiService.update(this.currentGame).subscribe();
  }

  private updateBoard() {
    if (!this.isBotGame) {
      this.readCurrentBoard();
    }
    if (this.playerOneTurn) {
      this.boardArray[this.currentTileCord[0]][this.currentTileCord[1]] = 1;
      this.currentContent = 'X';
    } else {
      this.boardArray[this.currentTileCord[0]][this.currentTileCord[1]] = -1;
      this.currentContent = 'O';
    }
  }

  private readCurrentBoard() {
    this.apiService.readOne(this.gameId).subscribe((game) => {
      this.boardArray = game?.board || this.boardArray;
    });
  }

  getCurrentBoard() {
    console.log(this.gameId);
    return this.apiService
      .readOne(this.gameId)
      .pipe(map((game) => game?.board));
  }
  getCurrentPlayer() {
    return this.apiService
      .readOne(this.gameId)
      .pipe(map((game) => game?.currentPlayerOne));
  }

  setGameID(gameID: string) {
    this.gameId = gameID;
  }

  setCurrentTile(cTileCord: number[]) {
    this.currentTileCord = cTileCord;
  }

  checkForWin() {
    this.readCurrentBoard();
    //Check for Row or Column Win
    for (let x = 0; x < 3; x++) {
      let colsum = 0;
      let rowsum = 0;
      for (let y = 0; y < 3; y++) {
        colsum += this.boardArray[y][x];
        rowsum += this.boardArray[x][y];
      }
      if (colsum === 3 || rowsum === 3) {
        this.endGame('X');
      } else if (colsum === -3 || rowsum === -3) {
        this.endGame('O');
      }
    }

    /* Check For Diagonal Wins */
    if (
      this.boardArray[0][0] + this.boardArray[1][1] + this.boardArray[2][2] ===
      3
    ) {
      this.endGame('X');
    } else if (
      this.boardArray[0][0] + this.boardArray[1][1] + this.boardArray[2][2] ===
      -3
    ) {
      this.endGame('O');
    }

    if (
      this.boardArray[2][0] + this.boardArray[1][1] + this.boardArray[0][2] ===
      3
    ) {
      this.endGame('X');
    } else if (
      this.boardArray[2][0] + this.boardArray[1][1] + this.boardArray[0][2] ===
      -3
    ) {
      this.endGame('O');
    }
  }

  private endGame(winner: 'X' | 'O') {
    this.updateGame(true);

    if (winner === 'X') {
      this.gameStatus.next(true);
      this.winningPlayer.next('X');
    } else if (winner === 'O') {
      this.gameStatus.next(true);
      this.winningPlayer.next('O');
    }
  }
}
