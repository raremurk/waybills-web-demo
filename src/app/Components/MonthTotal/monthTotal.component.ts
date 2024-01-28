import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../Services/data.service';
import { IDriverMonthTotal } from '../../Interfaces/iDriverMonthTotal';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToFixedPipe } from '../../Pipes/toFixedPipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DateService } from '../../Services/date.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatButtonModule, MatIconModule, ToFixedPipe],
  templateUrl: './monthTotal.component.html',
  styleUrl: './monthTotal.component.scss'
})
export class MonthTotalComponent implements OnInit, AfterViewInit{
  title = 'Итого за месяц';
  dataSource = new MatTableDataSource<IDriverMonthTotal>();
  dataColumns = ['driverFullName', 'transport', 'days', 'hours', 'earnings', 'factFuelConsumption', 'normalFuelConsumption',
    'numberOfRuns', 'totalMileage', 'totalMileageWithLoad', 'transportedLoad', 'normShift', 'conditionalReferenceHectares'];
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
      .subscribe({next:(data: IDriverMonthTotal[]) => this.dataSource.data = data});
  }
}
