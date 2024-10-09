import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { IDataMenu } from '../../data/menu/data-menu';
import { MenuService } from '../../data/menu/menu.service';
import { SidebarModule } from '../settings/sidebar.module';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf, NgForOf, SidebarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  public dataMenu!: IDataMenu[];

  constructor(public ms: MenuService) {}

  ngOnInit(): void {
    this.dataMenu = this.ms.getData();
  }

  public changeRoute(route: '/questions' | '/testing') {
    this.ms.setRoute(route);
    this.ms.setSettingMode(true);
  }
}
