import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveGameService {

  playerName: string = '';
  opponentName: string = ''

  constructor() { }

  //SET PLAYER NAMES
  setPlayerName(player: any) {
    this.playerName = player;
  }

  setOpponentName(opponent: any) {
    this.opponentName = opponent;
  }

  //LOCAL STORAGE LOGIC
  getSaveGame(player: any) {
    console.log('checking for saved games');
    let oldData = localStorage.getItem(player);
    return oldData ? JSON.parse(oldData) : { wins: 0, losses: 0, draws: 0 }
  }

  saveGame(player: any, score: Score) {
    console.log('saving game');
    localStorage.setItem(player, JSON.stringify(score))
  }

  clearSaveGame(player: any) {
    console.log('clearing saved game');
    localStorage.removeItem(player);
    return { wins: 0, losses: 0, draws: 0 }
  }
}

export interface Score {
  wins: number,
  losses: number,
  draws: number
}
