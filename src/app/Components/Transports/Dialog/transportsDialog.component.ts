import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Transport } from "../../../Models/transport";

@Component({
  standalone: true,
  imports: [FormsModule, MatButtonModule,	MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule],
	templateUrl: 'transportsDialog.component.html',
	styleUrls: ['./transportsDialog.component.scss']
  })
export class TransportsDialogComponent{
  transport: Transport = new Transport();

  constructor(public dialogRef: MatDialogRef<TransportsDialogComponent>) { }

  createTransport() {
    this.transport.id = 0;
    this.dialogRef.close(this.transport);
  }
}