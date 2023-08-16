export interface Game {
  id?: String;
  nameP1?: String;
  nameP2?: String;
  board: number[][];
  gameOver: boolean;
  winner?: 'X' | 'O';
}
