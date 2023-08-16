import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public board: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  constructor(private route: ActivatedRoute, private gs: GameService) {}

  ngOnInit() {
    this.gs.setGameID(this.route.snapshot.paramMap.get('id') || '');
    console.log(this.route.snapshot.paramMap.get('id'));
  }
}
