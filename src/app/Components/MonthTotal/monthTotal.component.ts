import { trigger, state, style, transition, animate } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSortModule, MatSort } from "@angular/material/sort";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { Title } from "@angular/platform-browser";
import { IDriverMonthTotal } from "../../Interfaces/MonthTotal/iDriverMonthTotal";
import { IMonthTotal } from "../../Interfaces/MonthTotal/iMonthTotal";
import { DataService } from "../../Services/data.service";
import { DateService } from "../../Services/date.service";

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSortModule, MatTableModule],
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
  title = 'Итого за месяц';
  columns = [
    { columnDef: 'waybillsCount', header: 'Пут. лист', cell: (total: IMonthTotal) => total.waybillsCount },
    { columnDef: 'days', header: 'Дни', cell: (total: IMonthTotal) => total.days },
    { columnDef: 'hours', header: 'Часы', cell: (total: IMonthTotal) => total.hours.toFixed(1) },
    { columnDef: 'earnings', header: 'Сумма', cell: (total: IMonthTotal) => total.earnings.toFixed(2) },
    { columnDef: 'weekend', header: 'Выхи', cell: (total: IMonthTotal) => total.weekend.toFixed(2) },
    { columnDef: 'bonus', header: 'Премия', cell: (total: IMonthTotal) => total.bonus.toFixed(2) },
    { columnDef: 'factFuelConsumption', header: 'ГСМ Факт', cell: (total: IMonthTotal) => total.factFuelConsumption },
    { columnDef: 'normalFuelConsumption', header: 'ГСМ Норма', cell: (total: IMonthTotal) => total.normalFuelConsumption },
    { columnDef: 'numberOfRuns', header: 'Число ездок', cell: (total: IMonthTotal) => total.numberOfRuns },
    { columnDef: 'totalMileage', header: 'Пробег всего', cell: (total: IMonthTotal) => total.totalMileage.toFixed(1) },
    { columnDef: 'totalMileageWithLoad', header: 'Пробег с грузом', cell: (total: IMonthTotal) => total.totalMileageWithLoad.toFixed(1) },
    { columnDef: 'transportedLoad', header: 'Перевезено груза, тонн', cell: (total: IMonthTotal) => total.transportedLoad.toFixed(3) },
    { columnDef: 'normShift', header: 'Нормо-смена', cell: (total: IMonthTotal) => total.normShift.toFixed(2) },
    { columnDef: 'conditionalReferenceHectares', header: 'Условный гектар', cell: (total: IMonthTotal) => total.conditionalReferenceHectares.toFixed(2) }
  ];
  dataSource = new MatTableDataSource<IDriverMonthTotal>();
  dataColumns = ['driverFullName', ... this.columns.map(c => c.columnDef), 'expand'];
  expandDataColumns = ['transportName', ... this.columns.map(c => c.columnDef), 'expand'];
  expandedRow: IDriverMonthTotal | null = <IDriverMonthTotal>{};
  @ViewChild(MatSort) sort = new MatSort();

  constructor(private titleService: Title, private dataService: DataService, private dateService: DateService){ }
    
  ngOnInit(){
    this.titleService.setTitle(this.title);
    this.getDriverMonthTotals();
    this.dateService.dateValueChange.subscribe(() => this.getDriverMonthTotals());
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  getDriverMonthTotals(){
    this.dataService.getDriverMonthTotals(this.dateService.year, this.dateService.month)
      .subscribe((data: IDriverMonthTotal[]) => this.dataSource.data = data);
  }
}
