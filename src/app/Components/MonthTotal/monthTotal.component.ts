import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../data.service';
import { IDriverMonthTotal } from '../../Interfaces/iDriverMonthTotal';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToFixedPipe } from '../../Pipes/toFixedPipe';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

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
    ToFixedPipe],
  templateUrl: './monthTotal.component.html',
  styleUrl: './monthTotal.component.scss',
  providers: [DataService]
})
export class MonthTotalComponent implements OnInit, AfterViewInit{
  title = 'Итого за месяц';
  months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  year = 2023;
  month = new Date().getMonth() + 1;
  dataSource = new MatTableDataSource<IDriverMonthTotal>();
  dataColumns = ['driverFullName', 'transport', 'days', 'hours', 'earnings', 'factFuelConsumption', 'normalFuelConsumption',
    'numberOfRuns', 'totalMileage', 'totalMileageWithLoad', 'transportedLoad', 'normShift', 'conditionalReferenceHectares'];
  @ViewChild(MatSort) sort = new MatSort();

  constructor(private titleService: Title, private dataService: DataService){ }
    
  ngOnInit(){
    this.titleService.setTitle(this.title);
    this.getDriverMonthTotals();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  getDriverMonthTotals(){
    this.dataService.getDriverMonthTotals(this.year, this.month)
      .subscribe({next:(data: IDriverMonthTotal[]) => this.dataSource.data = data});
  }
}
