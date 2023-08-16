export interface Game {
  id?: string;
  nameP1?: string;
  nameP2?: string;
  board: number[][];
  gameOver: boolean;
  winner?: 'X' | 'O';
}
