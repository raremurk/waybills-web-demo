import { trigger, state, style, transition, animate } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from "@angular/material/icon";
import { MatSortModule, MatSort } from "@angular/material/sort";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { IDetailedEntityMonthTotal } from "../../../Interfaces/MonthTotal/iDetailedEntityMonthTotal";
import { IMonthTotal } from "../../../Interfaces/MonthTotal/iMonthTotal";
import { DataService } from "../../../Services/data.service";
import { DateService } from "../../../Services/date.service";

@Component({
  selector: 'month-total',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSortModule,
    MatTableModule],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  templateUrl: './monthTotal.component.html',
  styleUrl: './monthTotal.component.scss'
})
export class MonthTotalComponent implements OnInit, AfterViewInit{
  mainEntity = 'Водитель';
  columns = [
    {
      columnDef: 'waybillsCount',
      header: 'Пут. лист',
      cell: (total: IMonthTotal) => total.waybillsCount,
      footer: () => this.dataSource.data.reduce((acc, value) => acc + value.waybillsCount, 0)
    },
    {
      columnDef: 'days',
      header: 'Дни',
      cell: (total: IMonthTotal) => total.days,
      footer: () => this.dataSource.data.reduce((acc, value) => acc + value.days, 0)
    },
    {
      columnDef: 'hours',
      header: 'Часы',
      cell: (total: IMonthTotal) => total.hours.toFixed(1),
      footer: () => this.dataSource.data.reduce((acc, value) => acc + value.hours, 0).toFixed(1)
    },
    {
      columnDef: 'earnings',
      header: 'Сумма',
      cell: (total: IMonthTotal) => total.earnings.toFixed(2),
      footer: () => this.dataSource.data.reduce((acc, value) => acc + value.earnings, 0).toFixed(2)
    },
    {
      columnDef: 'weekend',
      header: 'Выхи',
      cell: (total: IMonthTotal) => total.weekend.toFixed(2),
      footer: () => this.dataSource.data.reduce((acc, value) => acc + value.weekend, 0).toFixed(2)
    },
    {
      columnDef: 'bonus',
      header: 'Премия',
      cell: (total: IMonthTotal) => total.bonus.toFixed(2),
      footer: () => this.dataSource.data.reduce((acc, value) => acc + value.bonus, 0).toFixed(2)
    },
    {
      columnDef: 'factFuelConsumption',
      header: 'Факт',
      cell: (total: IMonthTotal) => total.factFuelConsumption,
      footer: () => this.dataSource.data.reduce((acc, value) => acc + value.factFuelConsumption, 0)
    },
    {
      columnDef: 'normalFuelConsumption',
      header: 'Норма',
      cell: (total: IMonthTotal) => total.normalFuelConsumption,
      footer: () => this.dataSource.data.reduce((acc, value) => acc + value.normalFuelConsumption, 0)
    },
    {
      columnDef: 'numberOfRuns',
      header: 'Число ездок',
      cell: (total: IMonthTotal) => total.numberOfRuns,
      footer: () => this.dataSource.data.reduce((acc, value) => acc + value.numberOfRuns, 0)
    },
    {
      columnDef: 'totalMileage',
      header: 'Всего',
      cell: (total: IMonthTotal) => total.totalMileage.toFixed(1),
      footer: () => this.dataSource.data.reduce((acc, value) => acc + value.totalMileage, 0).toFixed(1)
    },
    {
      columnDef: 'totalMileageWithLoad',
      header: 'С грузом',
      cell: (total: IMonthTotal) => total.totalMileageWithLoad.toFixed(1),
      footer: () => this.dataSource.data.reduce((acc, value) => acc + value.totalMileageWithLoad, 0).toFixed(1)
    },
    {
      columnDef: 'transportedLoad',
      header: 'Перевезено груза, тонн',
      cell: (total: IMonthTotal) => total.transportedLoad.toFixed(3),
      footer: () => this.dataSource.data.reduce((acc, value) => acc + value.transportedLoad, 0).toFixed(3)
    },
    {
      columnDef: 'normShift',
      header: 'Нормо-смена',
      cell: (total: IMonthTotal) => total.normShift.toFixed(2),
      footer: () => this.dataSource.data.reduce((acc, value) => acc + value.normShift, 0).toFixed(2)
    },
    {
      columnDef: 'conditionalReferenceHectares',
      header: 'Условный гектар',
      cell: (total: IMonthTotal) => total.conditionalReferenceHectares.toFixed(2),
      footer: () => this.dataSource.data.reduce((acc, value) => acc + value.conditionalReferenceHectares, 0).toFixed(2)
    }
  ];
  dataSource = new MatTableDataSource<IDetailedEntityMonthTotal>();
  dataColumns = ['mainEntityName', ... this.columns.map(c => c.columnDef), 'expand'];
  expandDataColumns = ['childEntityName', ... this.dataColumns.slice(1)];
  mainHeadersColumns = ['mainEntityName', 'waybillsCount', 'days', 'hours', 'earnings', 'weekend', 'bonus', 'fuel',
    'numberOfRuns', 'mileage', 'transportedLoad', 'normShift', 'conditionalReferenceHectares', 'expand'];
  childHeadersColumns = ['factFuelConsumption', 'normalFuelConsumption', 'totalMileage' , 'totalMileageWithLoad'];
  expandedRow: IDetailedEntityMonthTotal | null = <IDetailedEntityMonthTotal>{};
  @ViewChild(MatSort) sort = new MatSort();

  constructor(private dataService: DataService, private dateService: DateService){ }
    
  ngOnInit(){
    this.getMonthTotals();
    this.dateService.dateValueChange.subscribe(() => this.getMonthTotals());
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  getMonthTotals(){
    let mainEntity = this.mainEntity === 'Транспорт' ? 'transport' : 'driver';
    this.dataService.getMonthTotals(this.dateService.year, this.dateService.month, mainEntity)
      .subscribe((data: IDetailedEntityMonthTotal[]) => this.dataSource.data = data);
  }
}
