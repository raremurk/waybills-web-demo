import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Driver } from "../../../Models/driver";

@Component({
  standalone: true,
  imports: [FormsModule, MatButtonModule,	MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule],
	templateUrl: 'driversDialog.component.html',
	styleUrls: ['./driversDialog.component.scss']
  })
export class DriversDialogComponent{
  driver: Driver = new Driver();

  constructor(private dialogRef: MatDialogRef<DriversDialogComponent>) { }

  createDriver() {
    this.dialogRef.close(this.driver);
  }
}