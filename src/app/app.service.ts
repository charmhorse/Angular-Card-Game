import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Players {
  player1: string;
  player2: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private playersSubject = new BehaviorSubject<Players>({ player1: '', player2: '' });
  players$ = this.playersSubject.asObservable();

  setPlayers(players: Players): void {
    this.playersSubject.next(players);
  }

  getPlayers(): Players {
    return this.playersSubject.value;
  }
}
