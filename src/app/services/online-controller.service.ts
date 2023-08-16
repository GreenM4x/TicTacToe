import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root',
})
export default class OnlineControllerService extends GameService {
  /* constructor(apiService: ApiServiceService) {
    super(apiService);
  } */
}
