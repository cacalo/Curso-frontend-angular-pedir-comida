import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class TabsComponent {

  constructor(public router: Router){
  }

  colorDesactivado = "#555555";
  colorActivado = "#000000";

}
