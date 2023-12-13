import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule, MatSort } from "@angular/material/sort";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { Title } from "@angular/platform-browser";
import { DataService } from "../../data.service";
import { ICostPriceReport } from "../../Interfaces/iCostPriceReport";
import { ToFixedPipe } from "../../Pipes/toFixedPipe";
import * as XLSX from 'xlsx';

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
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
  providers: [DataService]
})
export class ReportsComponent implements OnInit{ 
  title = 'Отчеты';
  months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  year = new Date().getFullYear();
  month = new Date().getMonth() + 1;

  dataSource = new MatTableDataSource<ICostPriceReport>();
  dataColumns = ['productionCostCode', 'conditionalReferenceHectares', 'costPrice'];
  @ViewChild(MatSort) sort = new MatSort();
   
  constructor(public dialog: MatDialog, private titleService: Title, private dataService: DataService){ }
    
  ngOnInit(){
    this.titleService.setTitle(this.title);
    this.getCostPriceReport();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  getCostPriceReport(): void{
    this.dataService.getCostPriceReport(this.year, this.month)
      .subscribe((data: ICostPriceReport[]) => this.dataSource.data = data);   
  }

  getTotalConditionalReferenceHectares(): number{
    return this.dataSource.data.reduce((acc, value) => acc + value.conditionalReferenceHectares, 0);
  }

  getTotalCostPrice(): number{
    return this.dataSource.data.reduce((acc, value) => acc + value.costPrice, 0);
  }

  exportExcel(): void{
    let data = [...this.dataSource.data];
    let total: ICostPriceReport = { 
      productionCostCode: 'ИТОГО',
      conditionalReferenceHectares: this.getTotalConditionalReferenceHectares(),
      costPrice: this.getTotalCostPrice()
    }
    data.push(total);

    let fileName = `Себестоимость-${this.months[this.month - 1]}.xlsx`;
    
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    var wscols = [{wch:14}, {wch:14}, {wch:14}];  
    ws['!cols'] = wscols;
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, fileName);
  }
}