import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatTabsModule } from "@angular/material/tabs";
import { Title } from "@angular/platform-browser";
import { DriversFuelComponent } from "./DriversFuel/driversFuel.component";
import { FuelWaybillsComponent } from "./FuelWaybills/fuelWaybills.component";
import { TransportsFuelComponent } from "./TransportsFuel/transportsFuel.component";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    DriversFuelComponent,
    FormsModule,
    FuelWaybillsComponent,
    MatButtonToggleModule,
    MatTabsModule,
    TransportsFuelComponent],
  templateUrl: './fuel.component.html',
  styleUrl: './fuel.component.scss'
})
export class FuelComponent implements OnInit{
  title = 'Топливо';
  mainEntity = 'driver';
  tabIndex = 0;
  identifiers = {driverId: 0, transportId: 0};

  constructor(private titleService: Title){ }

  ngOnInit(){
    this.titleService.setTitle(this.title);
  }
  
  showWaybills(identifiers: {driverId: number, transportId: number}){
    this.identifiers = identifiers;
    this.tabIndex = 1;
  }
}
