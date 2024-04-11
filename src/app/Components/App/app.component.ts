import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterLinkActive, RouterLink, RouterOutlet } from "@angular/router";
import { DateService } from "../../Services/date.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule, MatTabsModule, RouterLinkActive, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  labels: string[] = ['Путевые листы', 'Отчеты', 'Топливо', 'Водители', 'Транспорт'];
	links: string[] = ['/waybills', '/reports', '/fuel', '/drivers', '/transports'];

  constructor(public dateService: DateService){ }
}
