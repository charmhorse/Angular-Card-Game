import { Component, OnInit } from '@angular/core';
import { takeUntil, filter } from 'rxjs/operators';
import { firstValueFrom, of, Subject, switchMap, tap } from 'rxjs';
import { BOARD_HEIGHT, BOARD_WIDTH } from './settings';
import { CardService } from './components/card/card.service';
import { Card } from './components/card/model';
import { shuffle } from './components/array/array';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  cards: Card[] = [];
  boardW = new Array(BOARD_WIDTH);
  boardH = new Array(BOARD_HEIGHT);
  unsolved!: number;
  lastClicked: string | null = null;
  revealedCards: number = 0;
  cardIndex: number = 0;
  waiting: boolean = false;
  clicks1: number = 0;
  clicks2: number = 0;
  player1: string = '';
  player2: string = '';
  isPlayer1: boolean = true;
  constructor(
    private cardService: CardService,
    public dialog: MatDialog,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.appService.players$.subscribe((players) => {
      this.player1 = players.player1;
      this.player2 = players.player2;
    });
    this.initGame({ isNext: false });
  }

  async initGame(p0: { isNext: boolean }): Promise<void> {
    if(p0.isNext == false){
      this.clicks1 = 0;
      this.clicks2 = 0;
    }
    if(p0.isNext == true) this.clicks2 = 0;
    if(this.isPlayer1 === false) this.isPlayer1 = true;
    this.waiting = false;
    this.cards = [];
    this.lastClicked = null;
    this.revealedCards = 0;
    this.cardIndex = 0;
    this.isPlayer1 = true;
    this.unsolved = Math.floor((BOARD_WIDTH * BOARD_HEIGHT) / 2);

    try {
      if(p0.isNext === false) this.openDialog();
      const data = await this.cardService.getImageList();
      data.forEach((item: { id: string }) => {
        this.cards.push(new Card(this.cardIndex, item.id));
        this.cards.push(new Card(this.cardIndex + 1, item.id));
        this.cardIndex += 2;
      });
      this.cards = shuffle(this.cards);
    } catch (error) {
      console.error('Error fetching image list', error);
    }
  }

  handleCardClick([id, imageId]: [number, string]): void {
    if (!this.waiting) {
      this.isPlayer1 ? this.clicks1++ : this.clicks2++;
      if (!this.isCardShown(id)) {
        this.showCard(id);
        if (this.lastClicked !== null && this.lastClicked === imageId) {
          this.unsolved--;
          this.lastClicked = null;
          this.revealedCards = 0;
        } else {
          this.revealedCards++;
          if (this.revealedCards === 2) {
            this.waiting = true;
            setTimeout(() => {
              this.hideCard(id);
              this.hideCardByImageId(this.lastClicked as string);
              this.revealedCards = 0;
              this.lastClicked = null;
              this.waiting = false;
            }, 1000);
          } else {
            this.lastClicked = imageId;
          }
        }
      }
    }
  }

  nextStep(): void {
    this.initGame({ isNext: true });
    this.isPlayer1 = false;
  }
  showCard(id: number): void {
    this.cards = this.cards.map((card) =>
      card.id === id ? { ...card, revealed: true } : card
    );
  }

  hideCard(id: number): void {
    this.cards = this.cards.map((card) =>
      card.id === id ? { ...card, revealed: false } : card
    );
  }

  hideCardByImageId(imageId: string): void {
    this.cards = this.cards.map((card) =>
      card.imageId === imageId ? { ...card, revealed: false } : card
    );
  }

  isCardShown(id: number): boolean {
    return this.cards.find((card) => card.id === id)?.revealed || false;
  }

  onOpenDialog(): Subject<any> {
    const myObservable = new Subject<any>();
    this.openOtherDialog(myObservable);
    return myObservable;
  }
  setIsPlayer1(): void {
    this.isPlayer1 = false;
  }
  openDialog(): void {
    this.dialog.open(DialogComponent);
  }
  async openOtherDialog(myObservable: Subject<any>) {
    const dialog = this.dialog.open(DialogComponent).afterClosed();
    myObservable.next(await firstValueFrom(dialog));
  }
}
