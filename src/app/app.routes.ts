import { Routes } from '@angular/router';

import { DriversComponent } from './Components/Drivers/drivers.component';
import { FuelComponent } from './Components/Fuel/fuel.component';
import { NotFoundComponent } from './Components/Not-found/not-found.component';
import { ReportsComponent } from './Components/Reports/reports.component';
import { TransportsComponent } from './Components/Transports/transports.component';
import { WaybillsComponent } from './Components/Waybills/waybills.component';

export const routes: Routes = [
  { path: '', redirectTo: 'waybills', pathMatch:'full'},
  { path: 'waybills', component: WaybillsComponent},
  { path: 'reports', component: ReportsComponent},
  { path: 'fuel', component: FuelComponent},
  { path: 'drivers', component: DriversComponent},
  { path: 'transports', component: TransportsComponent},
  { path: '**', component: NotFoundComponent }
];
