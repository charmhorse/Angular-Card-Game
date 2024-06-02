import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  standalone: true,
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class DialogComponent {
  players: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private playersService: AppService
  ) {
    this.players = new FormGroup({
      player1: new FormControl('', Validators.required),
      player2: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.players.invalid) {
      return;
    }

    const players = this.players.value as { player1: string; player2: string };
    this.playersService.setPlayers(players);
    this.dialogRef.close('dialog');
  }
}
