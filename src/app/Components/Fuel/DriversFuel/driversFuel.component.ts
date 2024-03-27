import { trigger, state, style, transition, animate } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSortModule, MatSort } from "@angular/material/sort";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { IDriverFuelMonthTotal } from "../../../Interfaces/Fuel/iDriverFuelMonthTotal";
import { DriverFullNamePipe } from "../../../Pipes/driverFullNamePipe";
import { DataService } from "../../../Services/data.service";
import { DateService } from "../../../Services/date.service";

@Component({
  selector: 'drivers-fuel',
  standalone: true,
  imports: [CommonModule, DriverFullNamePipe, MatBadgeModule, MatButtonModule, MatIconModule, MatSortModule, MatTableModule],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  templateUrl: './driversFuel.component.html',
  styleUrl: './driversFuel.component.scss'
})
export class DriversFuelComponent implements OnInit, AfterViewInit{
  dataSource = new MatTableDataSource<IDriverFuelMonthTotal>();
  mainHeadersColumns = ['driver', 'openWaybills', 'fuelTopUp', 'fuelConsumption', 'fuelEconomy', 'expand'];
  childHeadersColumns = ['factFuelConsumption', 'normalFuelConsumption'];
  dataColumns = ['driver', 'openWaybills', 'fuelTopUp', 'factFuelConsumption', 'normalFuelConsumption', 'fuelEconomy', 'expand'];
  expandDataColumns = ['transport', ... this.dataColumns.slice(1)];
  expandedRow = null;
  @ViewChild(MatSort) sort = new MatSort();
  @Output() identifiers = new EventEmitter<{driverId: number, transportId: number}>();

  constructor(private dataService: DataService, private dateService: DateService){ }

  ngOnInit(){
    this.getDriversFuelMonthTotal();
    this.dateService.dateValueChange.subscribe(() => this.getDriversFuelMonthTotal());
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  getDriversFuelMonthTotal(){
    this.dataService.getDriversFuelMonthTotal(this.dateService.year, this.dateService.month)
      .subscribe((data: IDriverFuelMonthTotal[]) => this.dataSource.data = data);
  }

  sendIdentifiers = (driverId: number, transportId: number) => this.identifiers.emit({driverId, transportId});

  getTotalFuelTopUp = () => this.dataSource.data.reduce((acc, value) => acc + value.fuelTopUp, 0);
  getTotalFactFuelConsumption = () => this.dataSource.data.reduce((acc, value) => acc + value.factFuelConsumption, 0);
  getTotalNormalFuelConsumption = () => this.dataSource.data.reduce((acc, value) => acc + value.normalFuelConsumption, 0);
  getTotalFuelEconomy = () => this.dataSource.data.reduce((acc, value) => acc + value.fuelEconomy, 0);
}
