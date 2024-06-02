import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BOARD_HEIGHT, BOARD_WIDTH } from 'src/app/settings';

@Injectable()
export class CardService {
  constructor(private readonly http: HttpClient) {}
  getImageList() : any{
    const NUMBER_OF_IMAGES = Math.round(BOARD_WIDTH * BOARD_HEIGHT / 2);NUMBER_OF_IMAGES
    return Array.from({length: 8} , (_, i) => ({id: i+1, number: i+1}));
  }
}