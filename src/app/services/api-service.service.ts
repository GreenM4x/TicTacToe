import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, of, map, catchError, throwError, delay, take } from 'rxjs';

import { Game } from '../model/game.model';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  games: Game[] = [];

  constructor(private http: HttpClient) {}

  read() {
    if (this.games.length) {
      return of(this.games);
    }

    return this.http.get<Game[]>(`/api/games`).pipe(
      tap((games) => {
        this.games = games;
      })
    );
  }

  readOne(id: string) {
    return this.read().pipe(
      map((games) => {
        const game = games.find((game: Game) => game.id === id);

        if (game) {
          return game;
        }

        return {
          id: `${id}`,
          nameP1: 'Blanc',
          nameP2: 'Blanc2',
          board: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
          ],
        };
      })
    );
  }
  create(payload: Game) {
    return this.http.post<Game>(`/api/games`, payload).pipe(
      tap((game) => {
        this.games = [...this.games, payload];
      })
    );
  }
  update(payload: Game) {
    return this.http.put<Game>(`/api/games/${payload.id}`, payload).pipe(
      tap(() => {
        this.games = this.games.filter((game: Game) => game.id !== payload.id);
      })
    );
  }
}
