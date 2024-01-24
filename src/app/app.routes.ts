import { Routes } from '@angular/router';

import { DriversComponent } from "./Components/Drivers/drivers.component";
import { TransportsComponent } from "./Components/Transports/transports.component";
import { WaybillsComponent } from "./Components/Waybills/waybills.component";
import { ReportsComponent } from './Components/Reports/reports.component';
import { NotFoundComponent } from "./Components/Not-found/not-found.component";
import { MonthTotalComponent } from './Components/MonthTotal/monthTotal.component';

export const routes: Routes = [
  { path: '', redirectTo: 'waybills', pathMatch:'full'}, 
  { path: 'drivers', component: DriversComponent},
  { path: 'transports', component: TransportsComponent},
  { path: 'waybills', component: WaybillsComponent},
  { path: 'reports', component: ReportsComponent},
  { path: 'monthTotal', component: MonthTotalComponent},
  { path: '**', component: NotFoundComponent }
];
