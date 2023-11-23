import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterLinkActive, RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatTabsModule, NgFor, RouterLinkActive, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  labels: string[] = ['Путевые листы', 'Отчеты', 'Водители', 'Транспорт'];
	links: string[] = ['/waybills', '/reports', '/drivers', '/transports'];
}
