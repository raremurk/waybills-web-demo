import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSortModule, MatSort } from "@angular/material/sort";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { Title } from "@angular/platform-browser";
import { IRate } from "../../Interfaces/iRate";
import { Rate } from "../../Models/rate";
import { DataService } from "../../Services/data.service";
import { ConfirmationDialogComponent } from "../ConfirmationDialog/confirmationDialog.component";
import { RatesDialogComponent } from "./Dialog/ratesDialog.component";

@Component({
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatTableModule],
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit, AfterViewInit{
  title = 'Расценки';
  rate = new Rate();
  editableRate = new Rate(); 
  dataSource = new MatTableDataSource<IRate>();
  displayedColumns = ['name', 'norm', 'rate', 'operations'];  
  @ViewChild(MatSort) sort = new MatSort();

  constructor(private dialog: MatDialog, private titleService: Title, private dataService: DataService){ }
    
  ngOnInit(){  
    this.titleService.setTitle(this.title); 
    this.loadAllRates();  
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }
 
  openDialog(){
    let dialogRef = this.dialog.open(RatesDialogComponent, { autoFocus: 'dialog', width: '368px' });
    dialogRef.afterClosed().subscribe((dialogResult: Rate) => {
      if(dialogResult.id === 0){
        this.dataService.createRate(dialogResult).subscribe((createdRate: IRate) => 
          this.dataSource.data = [createdRate, ...this.dataSource.data]);
      }
    });
  }

  openDeleteDialog(rate: IRate){
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, 
      { width: "400px", 
        data: { 
          action: 'Удаление расценки',
          objectName: rate.name,
          objectCode: rate.value }
    });
    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if(confirm === true){
        this.deleteRate(rate.id);
      }
    });
  }

  loadAllRates(){
    this.dataService.getAllRates().subscribe((data: IRate[]) => this.dataSource.data = data); 
  }

  editRate(_rate: Rate){
    this.rate = _rate;
    Object.assign(this.editableRate, _rate);    
  }

  updateRate(){
    this.dataService.updateRate(this.editableRate.id, this.editableRate).subscribe(() => {
      Object.assign(this.rate, this.editableRate); 
      this.cancel();
    });
  }

  deleteRate(id: number){
    this.dataService.deleteRate(id).subscribe(() => {
      var index = this.dataSource.data.findIndex(x => x.id == id);
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  cancel(){
    this.editableRate.id = 0;
  }
} 
