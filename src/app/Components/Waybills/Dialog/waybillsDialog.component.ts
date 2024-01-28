import { CommonModule, KeyValue } from "@angular/common";
import { Component, OnInit, AfterViewInit, ViewChild, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule, MatPaginator } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule, MatSort } from "@angular/material/sort";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { Driver } from "../../../CreationModels/driver";
import { Operation } from "../../../CreationModels/operation";
import { Waybill } from "../../../CreationModels/waybill";
import { DataService } from "../../../Services/data.service";
import { formatResult } from "../../../formatResult";
import { ITransport } from "../../../Interfaces/ITransport";
import { RangeDatePipe } from "../../../Pipes/rangeDatePipe";
import { ToFixedPipe } from "../../../Pipes/toFixedPipe";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    ToFixedPipe,
    RangeDatePipe],
  templateUrl: 'waybillsDialog.component.html',
  styleUrls: ['./waybillsDialog.component.scss'],
  providers: [DataService]
})
export class WaybillsDialogComponent implements OnInit, AfterViewInit{
  dialogTitle = 'Путевой лист №'
  waybillsRoute = 'waybills';
  minDate = new Date(2023, 0, 1);
  pageSize = 5;

  transportFilter: ITransport | string = '';
  filteredTransports: ITransport[] = [];

  driverFilter: Driver | string = '';
  filteredDrivers: Driver[] = [];

  dataSource = new MatTableDataSource<Operation>();
  mainHeadersColumns = ['productionCostCode', 'numberOfRuns', 'mileage', 'transportedLoad', 'done', 'normShift',
    'conditionalReferenceHectares', 'fuel'];
  childHeadersColumns = ['totalMileage', 'totalMileageWithLoad', 'norm', 'fact', 'mileageWithLoad',
    'fuelConsumptionPerUnit', 'totalFuelConsumption'];
  dataColumns = ['productionCostCode', 'numberOfRuns', 'totalMileage', 'totalMileageWithLoad', 'transportedLoad','norm', 'fact',
    'mileageWithLoad', 'normShift', 'conditionalReferenceHectares', 'fuelConsumptionPerUnit', 'totalFuelConsumption'];

  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = <MatPaginator>{};
  
  constructor(private dataService: DataService, public dialogRef: MatDialogRef<WaybillsDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
      public data: {
        editMode: boolean,
        drivers: Driver[],
        transports: ITransport[],
        waybill: Waybill}) { }

  ngOnInit(){
    this.transportFilter = this.data.waybill.transport ?? '';
    this.driverFilter = this.data.waybill.driver ?? '';
    this.dataSource.data = this.data.waybill.operations;
    this.filteredTransports = this.data.transports;
    this.filteredDrivers = this.data.drivers;
  }

  ngAfterViewInit(){
    this.sort.getNextSortDirection = () => this.sort.direction === '' ? 'desc' : '';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getTransportName = (transport : ITransport | null) => transport ? transport.name : '';
  getTransportCode = (transport : ITransport | null) => transport ? transport.code.toString() : '';

  getDriverPersonnelNumber = (driver : Driver | null) => driver ? driver.personnelNumber.toString() : '';
  getDriverShortFullName = (driver : Driver | null) => driver ? driver.shortFullName : '';

  changePageSize = () => this.paginator._changePageSize(this.pageSize);
  
  saveWaybill(){
    if(this.data.waybill.id === 0){
      this.dataService.createWaybill(this.data.waybill).subscribe(() =>{
        let waybill = new Waybill();
        waybill.date = new Date(this.data.waybill.date.setDate(this.data.waybill.date.getDate() + 1));
        waybill.driver = this.data.waybill.driver;
        waybill.transport = this.data.waybill.transport;
        this.data.waybill = waybill;
        this.dataSource.data = waybill.operations;
      });
    }
    else{
      this.dataService.updateWaybill(this.data.waybill.id, this.data.waybill).subscribe();
    }
  }

  enableEdit(){
    this.data.editMode = true;
  }

  filterTransports(){
    let filter = typeof this.transportFilter === 'string' ? 
      this.transportFilter.trim() : this.getTransportCode(this.transportFilter);
    this.filteredTransports = this.data.transports.filter(x => x.code.toString().startsWith(filter));
  }

  filterDrivers(){
    let filter = typeof this.driverFilter === 'string' ? 
      this.driverFilter.trim() : this.getDriverShortFullName(this.driverFilter);
    this.filteredDrivers = this.data.drivers.filter(x => x.shortFullName.toLowerCase().includes(filter.toLowerCase()));
  }

  setTransport = (transport: ITransport) => this.data.waybill.transport = transport;
  setDriver = (driver: Driver) => this.data.waybill.driver = driver;

  calculationHelp(){
    let map = new Map<number, number>();
    let operations = this.data.waybill.operations.filter(x => Number(x.norm) > 0 && Number(x.fact) > 0);
    operations.forEach(x => {
      let currentValue = map.get(Number(x.norm));
      let newValue = currentValue === undefined ? Number(x.fact) : currentValue + Number(x.fact);
      map.set(Number(x.norm), newValue);
    });
    return map;
  }

  keyDescOrder = (a: KeyValue<number,number>, b: KeyValue<number,number>) => a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
}