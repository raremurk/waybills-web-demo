import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule, MatSort } from "@angular/material/sort";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { Title } from "@angular/platform-browser";
import { Driver } from "../../CreationModels/driver";
import { Waybill } from "../../CreationModels/waybill";
import { DataService } from "../../data.service";
import { IDriver } from "../../Interfaces/iDriver";
import { IShortWaybill } from "../../Interfaces/iShortWaybill";
import { ITransport } from "../../Interfaces/ITransport";
import { IWaybill } from "../../Interfaces/iWaybill";
import { ToFixedPipe } from "../../toFixedPipe";
import { WaybillsDialogComponent } from "./Dialog/waybillsDialog.component";
     
@Component({
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSelectModule, MatSortModule, MatButtonModule, MatIconModule, ToFixedPipe],
  templateUrl: './waybills.component.html',
  styleUrls: ['./waybills.component.scss'],
  providers: [DataService]
})
export class WaybillsComponent implements OnInit{ 
  title = 'Путевые листы';
  driversRoute = 'drivers';
  transportsRoute = 'transports';
  drivers: Driver[] = [];
  transports: ITransport[] = [];
  waybill = new Waybill();
  editableWaybill = new Waybill();

  dataSource = new MatTableDataSource<IShortWaybill>();
  mainHeadersColumns = ['number', 'date', 'driverShortFullName', 'transportName', 'days', 'hours', 'earnings', 'fuel', 
    'conditionalReferenceHectares', 'operations'];
  childHeadersColumns = ['factFuelConsumption', 'normalFuelConsumption'];
  dataColumns = ['number', 'date', 'driverShortFullName', 'transportName', 'days', 'hours', 'earnings', 
    'factFuelConsumption', 'normalFuelConsumption', 'conditionalReferenceHectares', 'operations'];
  footerColumns = ['number', 'days', 'hours', 'earnings', 'factFuelConsumption', 'normalFuelConsumption', 
    'conditionalReferenceHectares', 'operations'];

  @ViewChild(MatSort) sort = new MatSort();
   
  constructor(public dialog: MatDialog, private titleService: Title, private dataService: DataService){ }
    
  ngOnInit(){
    this.titleService.setTitle(this.title);
    this.loadAllDrivers();
    this.loadAllWaybills();
    this.loadAllTransports();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  openCreateDialog(): void{
    this.waybill = new Waybill();
    this.openDialog(true); 
  }

  openEditDialog(waybillToEdit: Waybill): void{
    this.editableWaybill = waybillToEdit;
    this.dataService.getWaybill(waybillToEdit.id).subscribe((data: IWaybill) => {
      this.waybill = new Waybill(data);     
      this.openDialog(false);   
    });
  }

  openDialog(mode: boolean): void{
    this.dialog.open(WaybillsDialogComponent, 
      { autoFocus: 'dialog', 
        disableClose: true,
        height: "calc(100% - 16px)", 
        width: "calc(100% - 16px)", 
        maxWidth: "100%", 
        maxHeight: "100%", 
        data: { 
          editMode: mode,
          drivers: this.drivers,
          transports: this.transports,
          waybill: this.waybill }
    })     
  }

  loadAllWaybills(): void{
    this.dataService.getAllWaybills().subscribe({next:(data: IShortWaybill[]) => this.dataSource.data = data});   
  }

  loadDriverWaybills(driverId: number): void{
    this.dataService.getDriverWaybills(driverId).subscribe({next:(data: IShortWaybill[]) => this.dataSource.data = data});   
  }

  loadAllDrivers(): void{
    this.dataService.getAllDrivers().subscribe({next:(data: IDriver[]) => this.drivers = data.map(x => new Driver(x))});    
  }

  loadAllTransports(): void{
    this.dataService.getAll(this.transportsRoute).subscribe({next:(data: any) => this.transports = data});    
  }

  deleteWaybill(id: number): void{
    this.dataService.deleteWaybill(id).subscribe(() => {
      var index = this.dataSource.data.findIndex(x => x.id === id);
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  getTotalDays = (): number => this.dataSource.data.reduce((acc, value) => acc + value.days, 0);
  getTotalHours = (): number => this.dataSource.data.reduce((acc, value) => acc + value.hours, 0);
  getTotalEarnings = (): number => this.dataSource.data.reduce((acc, value) => acc + value.earnings, 0);
  getTotalFactFuelConsumption = (): number => this.dataSource.data.reduce((acc, value) => acc + value.factFuelConsumption, 0);
  getTotalNormalFuelConsumption = (): number => this.dataSource.data.reduce((acc, value) => acc + value.normalFuelConsumption, 0);
  getTotalConditionalReferenceHectares = (): number => this.dataSource.data.reduce((acc, value) => acc + value.conditionalReferenceHectares, 0);
}