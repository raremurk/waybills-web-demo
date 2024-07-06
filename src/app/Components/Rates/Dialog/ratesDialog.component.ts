import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Rate } from "../../../Models/rate";

@Component({
  standalone: true,
  imports: [FormsModule, MatButtonModule,	MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule],
	templateUrl: 'ratesDialog.component.html',
	styleUrls: ['./ratesDialog.component.scss']
  })
export class RatesDialogComponent{
  rate: Rate = new Rate();

  constructor(private dialogRef: MatDialogRef<RatesDialogComponent>) { }

  createRate() {
    this.dialogRef.close(this.rate);
  }
}