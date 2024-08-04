import { Component } from '@angular/core';
import {provideRouter, RouterLink} from "@angular/router";
import {routes} from "../../app.routes";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
