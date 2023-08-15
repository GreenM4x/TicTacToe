import { Injectable } from '@angular/core';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class ComputerControllerService extends GameService {
  constructor() {
    super();
  }

  override play() {
    console.log('Play');
  }
}
