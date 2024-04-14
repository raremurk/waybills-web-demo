import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterLinkActive, RouterLink, RouterOutlet } from "@angular/router";
import { DateService } from "../../Services/date.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, MatSelectModule, MatTabsModule, RouterLinkActive, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  routes = [
    { link: 'waybills', label: 'Путевые листы' },
    { link: 'reports', label: 'Отчеты' },
    { link: 'fuel', label: 'Топливо' },
    { link: 'drivers', label: 'Водители' },
    { link: 'transports', label: 'Транспорт' }
  ];

  constructor(public dateService: DateService){ }
}
