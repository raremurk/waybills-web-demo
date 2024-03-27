import { trigger, state, style, transition, animate } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSortModule, MatSort } from "@angular/material/sort";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { ITransportFuelMonthTotal } from "../../../Interfaces/Fuel/iTransportFuelMonthTotal";
import { DriverFullNamePipe } from "../../../Pipes/driverFullNamePipe";
import { DataService } from "../../../Services/data.service";
import { DateService } from "../../../Services/date.service";

@Component({
  selector: 'transports-fuel',
  standalone: true,
  imports: [CommonModule, DriverFullNamePipe, MatBadgeModule, MatButtonModule, MatIconModule, MatSortModule, MatTableModule],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  templateUrl: './transportsFuel.component.html',
  styleUrl: './transportsFuel.component.scss'
})
export class TransportsFuelComponent implements OnInit, AfterViewInit{
  dataSource = new MatTableDataSource<ITransportFuelMonthTotal>();
  dataColumns = ['transport', 'openWaybills', 'startFuel', 'fuelTopUp', 'endFuel', 'deviation', 'factFuelConsumption', 'expand'];
  expandDataColumns = ['driver', ... this.dataColumns.slice(1)];
  expandedRow = null;
  @ViewChild(MatSort) sort = new MatSort();
  @Output() identifiers = new EventEmitter<{driverId: number, transportId: number}>();

  constructor(private dataService: DataService, private dateService: DateService){ }

  ngOnInit(){
    this.getTransportsFuelMonthTotal();
    this.dateService.dateValueChange.subscribe(() => this.getTransportsFuelMonthTotal());
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  getTransportsFuelMonthTotal(){
    this.dataService.getTransportsFuelMonthTotal(this.dateService.year, this.dateService.month)
      .subscribe((data: ITransportFuelMonthTotal[]) => this.dataSource.data = data);
  }

  sendIdentifiers = (driverId: number, transportId: number) => this.identifiers.emit({driverId, transportId});

  getTotalStartFuel = () => this.dataSource.data.reduce((acc, value) => acc + value.startFuel, 0);
  getTotalFuelTopUp = () => this.dataSource.data.reduce((acc, value) => acc + value.fuelTopUp, 0);
  getTotalFactFuelConsumption = () => this.dataSource.data.reduce((acc, value) => acc + value.factFuelConsumption, 0);
  getTotalEndFuel = () => this.dataSource.data.reduce((acc, value) => acc + value.endFuel, 0);
  getTotalDeviation = () => this.dataSource.data.reduce((acc, value) => acc + value.deviation, 0);
}
