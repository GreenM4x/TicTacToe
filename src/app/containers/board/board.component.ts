import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  winningPlayer!: 'X' | 'O' | 'Draw';
  gameOver!: boolean;

  gameBoard: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  constructor(private route: ActivatedRoute, private gs: GameService) {}

  ngOnInit() {
    this.gs.setGameID(this.route.snapshot.paramMap.get('id') || '');

    this.gs.getCurrentBoard().subscribe((board) => {
      if (board !== undefined) this.gameBoard = board;
      this.gs.checkForWin();
    });

    this.gs.gameStatus.subscribe((isGameOver) => {
      this.gameOver = isGameOver;
    });

    this.gs.winningPlayer.subscribe((winningPlayer: 'X' | 'O' | 'Draw') => {
      this.winningPlayer = winningPlayer;
    });

    if (!this.route.snapshot.paramMap.get('id')) {
      this.gs.setToBot();
    }
  }

  setTile(coords: { x: number; y: number }) {
    this.gs.setCurrentTile([coords.x, coords.y]);
    this.gs.play();
    this.gameBoard = this.gs.getLocalBoard();
    this.checkForContent(coords.x, coords.y);
  }

  checkForContent(x: number, y: number): 'X' | 'O' | '' {
    if (!this.gameBoard) return '';
    if (this.gameBoard[x][y] === 1) return 'X';
    if (this.gameBoard[x][y] === -1) return 'O';
    return '';
  }
}
