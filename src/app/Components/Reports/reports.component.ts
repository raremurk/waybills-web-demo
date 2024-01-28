import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatSortModule, MatSort } from "@angular/material/sort";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { Title } from "@angular/platform-browser";
import { DataService } from "../../Services/data.service";
import { ICostPriceReport } from "../../Interfaces/iCostPriceReport";
import { ToFixedPipe } from "../../Pipes/toFixedPipe";
import * as XLSX from 'xlsx';
import { DateService } from "../../Services/date.service";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    ToFixedPipe],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit, AfterViewInit{
  title = 'Отчеты';
  dataSource = new MatTableDataSource<ICostPriceReport>();
  dataColumns = ['productionCostCode', 'conditionalReferenceHectares', 'costPrice'];
  @ViewChild(MatSort) sort = new MatSort();
   
  constructor(public dialog: MatDialog, private titleService: Title, private dataService: DataService, 
    private dateService: DateService){ }
    
  ngOnInit(){
    this.titleService.setTitle(this.title);
    this.getCostPriceReport();
    this.dateService.dateValueChange.subscribe(() => this.getCostPriceReport());
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  getCostPriceReport(): void{
    this.dataService.getCostPriceReport(this.dateService.year, this.dateService.month)
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

    let fileName = `Себестоимость-${this.dateService.year, this.dateService.month}.xlsx`;
    
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