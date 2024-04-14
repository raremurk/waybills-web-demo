import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { WaybillsDialogComponent } from "../Waybills/Dialog/waybillsDialog.component";

@Component({
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './confirmationDialog.component.html',
  styleUrl: './confirmationDialog.component.scss'
})
export class ConfirmationDialogComponent{

  constructor(public dialogRef: MatDialogRef<WaybillsDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: { action: string, objectName: string, objectCode: number }) { }

  confirmAction = () => this.dialogRef.close(true);
}
