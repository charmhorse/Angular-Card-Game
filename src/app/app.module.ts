import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { CardService } from './components/card/card.service';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  declarations: [AppComponent, CardComponent],
  bootstrap: [AppComponent],
  providers: [CardService],
})
export class AppModule {}
