import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-winscreen',
  templateUrl: './winscreen.component.html',
  styleUrls: ['./winscreen.component.scss'],
})
export class WinscreenComponent implements OnInit {
  @Input() winningPlayer!: 'X' | 'O' | 'Draw';

  winMsg: string = '';

  ngOnInit(): void {
    this.setWinMsg();
  }

  setWinMsg() {
    if (this.winningPlayer === 'X' || this.winningPlayer === 'O') {
      this.winMsg = `Congrats ${this.winningPlayer} You Won!`;
    } else {
      this.winMsg = 'Awww a Draw good luck next time';
    }
  }
}
