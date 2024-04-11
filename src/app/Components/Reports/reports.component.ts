import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { Title } from "@angular/platform-browser";
import { CostPriceComponent } from "./CostPrice/costPrice.component";
import { MonthTotalComponent } from "./MonthTotal/monthTotal.component";

@Component({
  standalone: true,
  imports: [CostPriceComponent, MatButtonModule, MatIconModule, MatTabsModule, MonthTotalComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit{
  title = 'Отчеты';
   
  constructor(private titleService: Title){ }
    
  ngOnInit(){
    this.titleService.setTitle(this.title);
  }
}