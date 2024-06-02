export interface ICard {
    id: number;
    imageId: string;
    revealed: boolean;
  }
  
  export class Card implements ICard {
    id: number;  
    imageId: string;
    revealed = false;
  
    constructor(id: number, imageId: string) {
      this.id = id;
      this.imageId = imageId;
    }
  }
  