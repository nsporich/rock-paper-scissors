import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaveGameService, Score } from 'src/app/services/save-game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  score: Score = { wins: 0, losses: 0, draws: 0 };
  tempName: string = '';
  playerName: string = '';

  constructor(public saveGameService: SaveGameService, public router: Router) { }

  ngOnInit(): void {
  }

  setName() {
    this.playerName = this.tempName;
    this.saveGameService.setPlayerName(this.playerName);
    this.savedGameLookup();
  }

  savedGameLookup() {
    let savedGame = this.saveGameService.getSaveGame(this.playerName);
    (savedGame.wins || savedGame.losses || savedGame.draws) && this.processSave(savedGame);
  }

  processSave(savedGame: Score) {
    console.log('found saved game data - applying it to session')
    this.score = savedGame;
  }

  startNewGame() {
    this.score = this.saveGameService.clearSaveGame(this.playerName);
    this.router.navigate(['game']);
  }

  continueFromSave() {
    this.router.navigate(['game']);
  }



}
