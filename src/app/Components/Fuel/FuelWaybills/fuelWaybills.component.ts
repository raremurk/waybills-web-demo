import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { IFuelWaybill } from "../../../Interfaces/Fuel/iFuelWaybill";
import { IDriver } from "../../../Interfaces/iDriver";
import { ITransport } from "../../../Interfaces/ITransport";
import { DriverFullNamePipe } from "../../../Pipes/driverFullNamePipe";
import { RangeDatePipe } from "../../../Pipes/rangeDatePipe";
import { DataService } from "../../../Services/data.service";
import { DateService } from "../../../Services/date.service";
import { WaybillsDialogComponent } from "../../Waybills/Dialog/waybillsDialog.component";

@Component({
  selector: 'fuel-waybills',
  standalone: true,
  imports: [
    CommonModule,
    DriverFullNamePipe,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    RangeDatePipe],
  templateUrl: './fuelWaybills.component.html',
  styleUrl: './fuelWaybills.component.scss'
})
export class FuelWaybillsComponent implements OnInit, OnChanges{
  dataSource = new MatTableDataSource<IFuelWaybill>();

  baseMainHeadersColumns = ['date', 'startFuel', 'fuelTopUp', 'endFuel', 'check', 'fuelConsumption', 'fuelEconomy', 'open'];
  baseDataColumns = ['date', 'startFuel', 'fuelTopUp', 'endFuel', 'check', 'factFuelConsumption', 'normalFuelConsumption',
    'fuelEconomy', 'open'];
  mainHeadersColumnsWithTransport = ['transport', ... this.baseMainHeadersColumns];
  dataColumnsWithTransport = ['transport', ... this.baseDataColumns];
  mainHeadersColumnsWithDriver= ['driver', ... this.baseMainHeadersColumns];
  dataColumnsWithDriver = ['driver', ... this.baseDataColumns];

  mainHeadersColumns = this.mainHeadersColumnsWithDriver;
  childHeadersColumns = ['factFuelConsumption', 'normalFuelConsumption'];
  dataColumns = this.dataColumnsWithDriver;

  drivers: IDriver[] = [];
  transports: ITransport[] = [];
  @Input() identifiers = {driverId: 0, transportId: 0};

  constructor(private dialog: MatDialog, private dataService: DataService, private dateService: DateService){ }

  ngOnInit(){
    this.loadAllDrivers();
    this.loadAllTransports();
    this.getFuelWaybills();
    this.dateService.dateValueChange.subscribe(() => this.getFuelWaybills());
  }

  loadAllDrivers = () => this.dataService.getAllDrivers().subscribe((data: IDriver[]) => this.drivers = data);
  loadAllTransports = () => this.dataService.getAllTransports().subscribe((data: ITransport[]) => this.transports = data); 

  ngOnChanges(changes: SimpleChanges){
    if(changes['identifiers']){
      this.updateTableColumns();
      this.getFuelWaybills();
    }
  }

  getFuelWaybills(){
    this.dataService.getFuelWaybills(this.dateService.year, this.dateService.month, this.identifiers.driverId,
      this.identifiers.transportId,).subscribe((data: IFuelWaybill[]) => this.dataSource.data = data);
  }

  openDialog(waybillId: number){
    let dialogRef = this.dialog.open(WaybillsDialogComponent, 
      { autoFocus: 'dialog',
        disableClose: true,
        maxWidth: "calc(100vw - 36px)",
        maxHeight: "calc(100vh - 20px)",
        data: {
          waybillId: waybillId,
          editMode: false,
          drivers: this.drivers,
          transports: this.transports}
    })
    dialogRef.afterClosed().subscribe((changesWereMade: boolean) => {
      if(changesWereMade === true){
        this.getFuelWaybills();
      }
    });
  }

  updateTableColumns(){
    if(this.identifiers.driverId != 0 && this.identifiers.transportId != 0){
      this.mainHeadersColumns = this.baseMainHeadersColumns;
      this.dataColumns = this.baseDataColumns;
    }
    else if(this.identifiers.driverId != 0 ){
      this.mainHeadersColumns = this.mainHeadersColumnsWithTransport;
      this.dataColumns = this.dataColumnsWithTransport;
    }
    else{
      this.mainHeadersColumns = this.mainHeadersColumnsWithDriver;
      this.dataColumns = this.dataColumnsWithDriver;
    }
  }

  analyze(index: number){
    return !this.dataSource.data[index + 1] || this.dataSource.data[index].endFuel === this.dataSource.data[index + 1].startFuel;
  }

  getTotalFuelTopUp = () => this.dataSource.data.reduce((acc, value) => acc + value.fuelTopUp, 0);
  getTotalFactFuelConsumption = () => this.dataSource.data.reduce((acc, value) => acc + value.factFuelConsumption, 0);
  getTotalNormalFuelConsumption = () => this.dataSource.data.reduce((acc, value) => acc + value.normalFuelConsumption, 0);
  getTotalFuelEconomy = () => this.dataSource.data.reduce((acc, value) => acc + value.fuelEconomy, 0);
}
