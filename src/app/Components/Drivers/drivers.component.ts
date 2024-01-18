import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { Title } from "@angular/platform-browser";
import { DataService } from "../../data.service";
import { Driver } from "../../CreationModels/driver";
import { DriversDialogComponent } from "./Dialog/driversDialog.component";
import { IDriver } from "../../Interfaces/iDriver";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatTableModule],
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
  providers: [DataService]
})
export class DriversComponent implements OnInit{ 
  title = 'Водители';
  driversRoute = 'drivers'; 
  driver = new Driver();
  editableDriver = new Driver(); 
  dataSource = new MatTableDataSource<IDriver>();
  displayedColumns = ['lastName', 'firstName', 'middleName', 'personnelNumber', 'operations'];  
  @ViewChild(MatSort) sort = new MatSort();

  constructor(public dialog: MatDialog, private titleService: Title, private dataService: DataService){ }
    
  ngOnInit(){  
    this.titleService.setTitle(this.title); 
    this.loadAllDrivers();  
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }
 
  openDialog(){
    this.dialog.open(DriversDialogComponent, { autoFocus: 'dialog', width: '478px' }).afterClosed().subscribe((result: Driver) => {
      if(result.id === 0) {
        this.dataService.create(this.driversRoute, result)
          .subscribe({next:(createdDriver: any) => this.dataSource.data = [...this.dataSource.data, createdDriver]});
      }
    });
  }

  loadAllDrivers(){
    this.dataService.getAllDrivers().subscribe({next:(data: IDriver[]) => this.dataSource.data = data}); 
  }

  editDriver(_driver: Driver){
    this.driver = _driver;
    Object.assign(this.editableDriver, _driver);    
  }

  updateDriver(){
    this.dataService.update(this.driversRoute, this.editableDriver.id, this.editableDriver).subscribe(() => {
      Object.assign(this.driver, this.editableDriver); 
      this.cancel();
    });
  }

  deleteDriver(id: number){
    this.dataService.delete(this.driversRoute, id).subscribe(() => {
      var index = this.dataSource.data.findIndex(x => x.id == id);
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  cancel(){
    this.editableDriver.id = 0;
  }
} 
