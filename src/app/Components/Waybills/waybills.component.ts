import { CommonModule } from "@angular/common";
import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule, MatSort } from "@angular/material/sort";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { Title } from "@angular/platform-browser";
import { IDriver } from "../../Interfaces/iDriver";
import { IShortWaybill } from "../../Interfaces/iShortWaybill";
import { ITransport } from "../../Interfaces/ITransport";
import { DriverFullNamePipe } from "../../Pipes/driverFullNamePipe";
import { RangeDatePipe } from "../../Pipes/rangeDatePipe";
import { ToFixedPipe } from "../../Pipes/toFixedPipe";
import { DataService } from "../../Services/data.service";
import { DateService } from "../../Services/date.service";
import { WaybillsDialogComponent } from "./Dialog/waybillsDialog.component";
     
@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSelectModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    ToFixedPipe,
    RangeDatePipe,
    DriverFullNamePipe],
  templateUrl: './waybills.component.html',
  styleUrls: ['./waybills.component.scss']
})
export class WaybillsComponent implements OnInit, AfterViewInit{
  title = 'Путевые листы';
  driverId = 0;
  drivers: IDriver[] = [];
  transports: ITransport[] = [];
  editableWaybill = <IShortWaybill>{};

  dataSource = new MatTableDataSource<IShortWaybill>();
  mainHeadersColumns = ['number', 'date', 'driverShortFullName', 'transportName', 'days', 'hours', 'earnings', 'fuel', 
    'conditionalReferenceHectares', 'operations'];
  childHeadersColumns = ['factFuelConsumption', 'normalFuelConsumption'];
  dataColumns = ['number', 'date', 'driverShortFullName', 'transportName', 'days', 'hours', 'earnings', 
    'factFuelConsumption', 'normalFuelConsumption', 'conditionalReferenceHectares', 'operations'];
  footerColumns = ['number', 'days', 'hours', 'earnings', 'factFuelConsumption', 'normalFuelConsumption', 
    'conditionalReferenceHectares', 'operations'];

  @ViewChild(MatSort) sort = new MatSort();
   
  constructor(public dialog: MatDialog, private titleService: Title, private dataService: DataService, 
    private dateService: DateService) { }
    
  ngOnInit(){
    this.titleService.setTitle(this.title);
    this.loadAllDrivers();
    this.loadAllWaybills();
    this.loadAllTransports();
    this.dateService.dateValueChange.subscribe(() => this.loadAllWaybills());
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  openCreateDialog = () => this.openDialog(0, true)

  openEditDialog(waybillToEdit: IShortWaybill){
    this.editableWaybill = waybillToEdit;
    this.openDialog(waybillToEdit.id, false);   
  }

  openDialog(waybillId: number, mode: boolean){
    let dialogRed = this.dialog.open(WaybillsDialogComponent, 
      { autoFocus: 'dialog', 
        disableClose: true,
        height: "calc(100% - 16px)", 
        width: "calc(100% - 16px)", 
        maxWidth: "100%", 
        maxHeight: "100%", 
        data: {
          waybillId: waybillId,
          editMode: mode,
          drivers: this.drivers,
          transports: this.transports}
    })
    dialogRed.afterClosed().subscribe();
  }

  loadAllDrivers = () => this.dataService.getAllDrivers().subscribe((data: IDriver[]) => this.drivers = data);

  loadAllWaybills(){
    this.dataService.getAllWaybills(this.dateService.year, this.dateService.month, this.driverId)
      .subscribe((data: IShortWaybill[]) => this.dataSource.data = data);   
  }

  loadAllTransports = () => this.dataService.getAllTransports().subscribe((data: ITransport[]) => this.transports = data);    

  deleteWaybill(id: number){
    this.dataService.deleteWaybill(id).subscribe(() => {
      var index = this.dataSource.data.findIndex(x => x.id === id);
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  getTotalDays = () => this.dataSource.data.reduce((acc, value) => acc + value.days, 0);
  getTotalHours = () => this.dataSource.data.reduce((acc, value) => acc + value.hours, 0);
  getTotalEarnings = () => this.dataSource.data.reduce((acc, value) => acc + value.earnings, 0);
  getTotalFactFuelConsumption = () => this.dataSource.data.reduce((acc, value) => acc + value.factFuelConsumption, 0);
  getTotalNormalFuelConsumption = () => this.dataSource.data.reduce((acc, value) => acc + value.normalFuelConsumption, 0);
  getTotalConditionalReferenceHectares = () => this.dataSource.data.reduce((acc, value) => acc + value.conditionalReferenceHectares, 0);
}