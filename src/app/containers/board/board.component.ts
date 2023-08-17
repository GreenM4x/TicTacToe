import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  winningPlayer!: 'X' | 'O';
  gameOver!: boolean;

  public board: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  constructor(private route: ActivatedRoute, private gs: GameService) {}

  ngOnInit() {
    this.gs.gameStatus.subscribe((isGameOver) => {
      this.gameOver = isGameOver;
    });

    this.gs.winningPlayer.subscribe((winningPlayer: 'X' | 'O') => {
      this.winningPlayer = winningPlayer;
    });

    this.gs.setGameID(this.route.snapshot.paramMap.get('id') || '');

    if (!this.route.snapshot.paramMap.get('id')) {
      this.gs.setToBot();
    }
  }
}
