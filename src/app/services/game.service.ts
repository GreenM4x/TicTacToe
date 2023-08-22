import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Game } from '../model/game.model';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  currentContent: string = '';
  currentTurn: number = 0;

  gameId!: string;
  newGame!: Game;

  isBotGame!: boolean;
  isBotTurn: boolean = true;

  boardArray: number[][] = new Array(3).fill(0).map(() => new Array(3).fill(0));
  currentTileCord: number[] = [0, 0];

  playerOneTurn!: boolean;

  currentGame: Game = {
    id: '',
    board: this.boardArray,
    gameOver: false,
    currentPlayerOne: this.playerOneTurn,
  };

  winningPlayer: Subject<'X' | 'O' | 'Draw'> = new Subject();
  gameStatus: Subject<boolean> = new Subject();

  constructor(private apiService: ApiServiceService) {}

  startGame(): Observable<string | undefined> {
    this.isBotGame = false;
    this.playerOneTurn = true;

    this.boardArray = new Array(3).fill(0).map(() => new Array(3).fill(0));

    this.newGame = {
      id: '',
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
      id: 'bot',
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

      let isGameOver: boolean = this.checkForWin();

      if (!isGameOver) {
        this.updateGame(false);
      }
    });
  }

  private PlayBot() {
    this.updateBoard();
    this.playerOneTurn = !this.playerOneTurn;

    this.checkForWin();

    let isGameOver: boolean = this.checkForWin();

    if (this.isBotTurn && !isGameOver) {
      this.botsMove();
    }

    this.isBotTurn = true;
  }

  private botsMove() {
    this.isBotTurn = false;
    let randomX = Math.floor(Math.random() * 3);
    let RandomY = Math.floor(Math.random() * 3);

    if (!this.chechForSpace(randomX, RandomY)) {
      this.botsMove();
      return;
    }
    this.setCurrentTile([randomX, RandomY]);
    this.play();
  }

  private chechForSpace(x: number, y: number): boolean {
    if (this.boardArray[x][y]) {
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

  checkForWin(): boolean {
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
        return true;
      } else if (colsum === -3 || rowsum === -3) {
        this.endGame('O');
        return true;
      }
    }

    /* Check For Diagonal Wins */
    if (
      this.boardArray[0][0] + this.boardArray[1][1] + this.boardArray[2][2] ===
      3
    ) {
      this.endGame('X');
      return true;
    } else if (
      this.boardArray[0][0] + this.boardArray[1][1] + this.boardArray[2][2] ===
      -3
    ) {
      this.endGame('O');
      return true;
    }

    if (
      this.boardArray[2][0] + this.boardArray[1][1] + this.boardArray[0][2] ===
      3
    ) {
      this.endGame('X');
      return true;
    } else if (
      this.boardArray[2][0] + this.boardArray[1][1] + this.boardArray[0][2] ===
      -3
    ) {
      this.endGame('O');
      return true;
    }

    return this.checkForDraw(this.boardArray);
  }

  private checkForDraw(board: number[][]): boolean {
    let count = 0;
    for (const row of board) {
      for (const num of row) {
        if (num !== 0) {
          count++;
        }
      }
    }

    if (count === 9) {
      this.endGame('Draw');
      return true;
    }
    return false;
  }

  private endGame(winner: 'X' | 'O' | 'Draw') {
    if (winner === 'X') {
      this.gameStatus.next(true);
      this.winningPlayer.next('X');
    } else if (winner === 'O') {
      this.gameStatus.next(true);
      this.winningPlayer.next('O');
    } else if (winner === 'Draw') {
      this.gameStatus.next(true);
      this.winningPlayer.next('Draw');
    }

    if (this.isBotGame) return;
    this.updateGame(true);
  }

  getCurrentContent() {
    return this.currentContent;
  }

  getCurrentBoard() {
    return this.apiService
      .readOne(this.gameId)
      .pipe(map((game) => game?.board));
  }
  getLocalBoard() {
    return this.boardArray;
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
}
