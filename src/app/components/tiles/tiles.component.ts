import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss'],
})
export class TilesComponent implements OnInit {
  @Input() coords!: { x: number; y: number };
  currentboard!: number[][] | undefined;
  content: string = '';

  ngOnInit(): void {
    if (this.gs.isBotGame) return;
    this.gs.getCurrentBoard().subscribe((board) => {
      this.currentboard = board;
      this.checkfortiles();
      this.gs.checkForWin();
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
  }
  setTile() {
    this.gs.setCurrentTile([this.coords.x, this.coords.y]);
    this.gs.play();
    this.content = this.gs.getCurrentContent();

    if (this.gs.isBotGame) return;
    this.gs.getCurrentBoard().subscribe((board) => (this.currentboard = board));
  }

  constructor(private gs: GameService) {}
}
