import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { Title } from "@angular/platform-browser";
import { IDriver } from "../../Interfaces/iDriver";
import { ITransport } from "../../Interfaces/ITransport";
import { DriverFullNamePipe } from "../../Pipes/driverFullNamePipe";
import { DataService } from "../../Services/data.service";
import { DriversFuelComponent } from "./DriversFuel/driversFuel.component";
import { FuelWaybillsComponent } from "./FuelWaybills/fuelWaybills.component";
import { TransportsFuelComponent } from "./TransportsFuel/transportsFuel.component";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    DriverFullNamePipe,
    DriversFuelComponent,
    FuelWaybillsComponent,
    TransportsFuelComponent],
  templateUrl: './fuel.component.html',
  styleUrl: './fuel.component.scss'
})
export class FuelComponent implements OnInit{
  title = 'Топливо';
  mainEntity = 'driver';
  tabIndex = 0;
  identifiers = {driverId: 0, transportId: 0};
  drivers: IDriver[] = [];
  transports: ITransport[] = [];

  constructor(private titleService: Title, private dataService: DataService){ }

  ngOnInit(){
    this.loadAllDrivers();
    this.loadAllTransports();
    this.titleService.setTitle(this.title);
  }
  
  loadAllDrivers = () => this.dataService.getAllDrivers().subscribe((data: IDriver[]) => this.drivers = data);
  loadAllTransports = () => this.dataService.getAllTransports().subscribe((data: ITransport[]) => this.transports = data); 

  updateIdentifiers = () => this.identifiers = Object.assign({}, this.identifiers);

  showWaybills(identifiers: {driverId: number, transportId: number}){
    this.identifiers = identifiers;
    this.tabIndex = 1;
  }
}
