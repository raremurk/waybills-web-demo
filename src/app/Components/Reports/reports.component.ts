import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { Title } from "@angular/platform-browser";
import { CostPriceComponent } from "./CostPrice/costPrice.component";
import { MonthTotalComponent } from "./MonthTotal/monthTotal.component";

@Component({
  standalone: true,
  imports: [
    FormsModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    CostPriceComponent,
    MonthTotalComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit{
  title = 'Отчеты';
  mainEntity = 'Водитель';
  price = '32.00';
   
  constructor(private titleService: Title){ }
    
  ngOnInit(){
    this.titleService.setTitle(this.title);
  }
}