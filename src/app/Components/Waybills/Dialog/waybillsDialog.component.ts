import { CommonModule, KeyValue } from "@angular/common";
import { Component, OnInit, AfterViewInit, ViewChild, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule, MatPaginator } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { firstValueFrom } from "rxjs";
import { IOmnicommFuel } from "../../../Interfaces/IOmnicommFuel";
import { ITransport } from "../../../Interfaces/ITransport";
import { IDriver } from "../../../Interfaces/iDriver";
import { IRate } from "../../../Interfaces/iRate";
import { IWaybill } from "../../../Interfaces/iWaybill";
import { OperationCreation } from "../../../Models/Operation/operationCreation";
import { OperationView } from "../../../Models/Operation/operationView";
import { WaybillCreation } from "../../../Models/Waybill/waybillCreation";
import { WaybillView } from "../../../Models/Waybill/waybillView";
import { DriverFullNamePipe } from "../../../Pipes/driverFullNamePipe";
import { RangeDatePipe } from "../../../Pipes/rangeDatePipe";
import { ToFixedPipe } from "../../../Pipes/toFixedPipe";
import { DataService } from "../../../Services/data.service";
import { CalculationCreation } from "../../../Models/Calculation/calculationCreation";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    ToFixedPipe,
    RangeDatePipe,
    DriverFullNamePipe],
  templateUrl: 'waybillsDialog.component.html',
  styleUrls: ['./waybillsDialog.component.scss'],
  providers: [DriverFullNamePipe]
})
export class WaybillsDialogComponent implements OnInit, AfterViewInit{
  dialogTitle = 'Путевой лист №';
  minDate = new Date(2023, 0, 1);
  changesWereMade = false;
  waybill: WaybillCreation | WaybillView = new WaybillCreation();
  iWaybill: IWaybill = <IWaybill>{};
  omnicommFuel: IOmnicommFuel = { transportName: "—", startFuel: 0, fuelTopUp: 0, endFuel: 0, fuelConsumption: 0, draining: 0 };

  transportFilter: ITransport | string = '';
  filteredTransports: ITransport[] = [];

  driverFilter: IDriver | string = '';
  filteredDrivers: IDriver[] = [];

  private _calculationHelp = new Map<number, {quantity: number, rate: number}>();
  rates: IRate[] = [];

  pageSize = 5;
  pageSizes = Array.from({length: 13 - this.pageSize}, (_, i) => i + this.pageSize);

  dataSource = new MatTableDataSource<OperationCreation | OperationView>();
  mainHeadersColumns = ['productionCostCode', 'numberOfRuns', 'mileage', 'transportedLoad', 'done', 'normShift',
    'conditionalReferenceHectares', 'fuel'];
  childHeadersColumns = ['totalMileage', 'totalMileageWithLoad', 'norm', 'fact', 'mileageWithLoad',
    'fuelConsumptionPerUnit', 'totalFuelConsumption'];
  dataColumns = ['productionCostCode', 'numberOfRuns', 'totalMileage', 'totalMileageWithLoad', 'transportedLoad','norm', 'fact',
    'mileageWithLoad', 'normShift', 'conditionalReferenceHectares', 'fuelConsumptionPerUnit', 'totalFuelConsumption'];

  @ViewChild(MatPaginator) paginator = <MatPaginator>{};
  
  constructor(private dataService: DataService, public driverFullNamePipe: DriverFullNamePipe, 
    public dialogRef: MatDialogRef<WaybillsDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
      public data: {
        waybillId: number,
        editMode: boolean,
        drivers: IDriver[],
        transports: ITransport[]}) { }

  ngOnInit(){
    this.initializeWaybill();
    this.filteredTransports = this.data.transports;
    this.filteredDrivers = this.data.drivers;
    this.getAllRates();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  getAllRates = () => this.dataService.getAllRates().subscribe((data: IRate[]) => this.rates = data);

  async initializeWaybill(){
    if(this.data.waybillId){
      this.iWaybill = await firstValueFrom(this.dataService.getWaybill(this.data.waybillId));
      this.waybill = new WaybillView(this.iWaybill);
      
      let operationsCount = this.iWaybill.operations.length;
      if(operationsCount > this.pageSize){
        this.pageSize = operationsCount;
        this.changePageSize();
      }
    }
    this.dataSource.data = this.waybill.operations;
    this.transportFilter = this.waybill.transport ?? '';
    this.driverFilter = this.waybill.driver ?? '';
  }
  
  saveWaybill(){
    if(this.waybill instanceof WaybillCreation){
      let httpAction = this.waybill.id === 0 ?
        this.dataService.createWaybill(this.waybill) : this.dataService.updateWaybill(this.waybill.id, this.waybill);
      httpAction.subscribe((data: IWaybill) => {
          this.iWaybill = data;
          this.waybill = new WaybillView(this.iWaybill);
          this.transportFilter = this.iWaybill.transport ?? '';
          this.driverFilter = this.iWaybill.driver ?? '';
          this.dataSource.data = this.waybill.operations;
          this.data.editMode = false;
          this.changesWereMade = true;
      });
    }
  }

  nextWaybill(){
    let waybill = new WaybillCreation();
    waybill.date = new Date(this.waybill.date.setDate(this.waybill.date.getDate() + 1));
    waybill.driver = this.waybill.driver;
    waybill.transport = this.waybill.transport;
    this.waybill = waybill;
    this.dataSource.data = waybill.operations;
    this.data.editMode = true;
  }

  enableEdit(){
    this.waybill = new WaybillCreation(this.iWaybill);
    this.dataSource.data = this.waybill.operations;
    this.data.editMode = true;
  }

  disableEdit(){
    this.data.editMode = false;
    this.waybill = new WaybillView(this.iWaybill);
    this.dataSource.data = this.waybill.operations;
    this.transportFilter = this.iWaybill.transport ?? '';
    this.driverFilter = this.iWaybill.driver ?? '';
  }

  filterTransports(){
    let filter = typeof this.transportFilter === 'string' ? 
      this.transportFilter.trim() : this.getTransportCode(this.transportFilter);
    this.filteredTransports = this.data.transports.filter(x => x.code.toString().startsWith(filter));
  }

  filterDrivers(){
    let filter = typeof this.driverFilter === 'string' ? 
      this.driverFilter.trim() : this.driverFullNamePipe.transform(this.driverFilter);
    this.filteredDrivers = this.data.drivers.filter(x => this.driverFullNamePipe.transform(x).toLowerCase().includes(filter.toLowerCase()));
  }

  getTransportCode = (transport : ITransport | null) => transport ? transport.code.toString() : '';

  setTransport = (transport: ITransport) => this.waybill.transport = transport;
  setDriver = (driver: IDriver) => this.waybill.driver = driver;

  changePageSize = () => this.paginator._changePageSize(this.pageSize);

  calculationHelp(){
    let map = new Map<number, {quantity: number, rate: number}>();
    let operations = this.waybill.operations
        .filter(x => Number(x.norm) > 0 && Number(x.fact) > 0)
        .map(x => { return {norm: Number(x.norm), fact: Number(x.fact)} });
    operations.forEach(x => {
      let currentValue = map.get(x.norm);
      let newValue = currentValue === undefined ? x.fact : currentValue.quantity + x.fact;
      map.set(x.norm, {quantity: newValue, rate: this.rates.find(z => z.norm === x.norm)?.value ?? 0});
    });
    this._calculationHelp = map;
    return this._calculationHelp;
  }
  
  transferValues(){
    let calculations = Array.from(this._calculationHelp).map(x => 
      new CalculationCreation({id: 0, quantity: x[1].quantity, price: x[1].rate, sum: 0}));
    while(calculations.length < 6){
      calculations.push(new CalculationCreation());
    }
    this.waybill.calculations = calculations;
  }

  keyDescOrder = (a: KeyValue<number,{quantity: number, rate: number}>, b: KeyValue<number,{quantity: number, rate: number}>) => a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);

  getOmnicommFuel(){
    let omnicommId = this.waybill.transport?.omnicommId ?? 0;
    this.dataService.getOmnicommFuel(this.waybill.date, omnicommId).subscribe((data: IOmnicommFuel) => this.omnicommFuel = data);
  }
}