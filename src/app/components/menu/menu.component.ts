import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { IDataMenu } from '../../data/menu/data-menu';
import { MenuService } from '../../data/menu/menu.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf, NgForOf],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  public dataMenu!: IDataMenu[];
  public activeNumOfQuestions = 20;
  public activeBlockTests = 1;
  constructor(private _dataMenu: MenuService) {}

  ngOnInit(): void {
    this.dataMenu = this._dataMenu.getData();
  }
  public changeNumOfQuestions(numOfQuestions: number): void {
    this.activeNumOfQuestions = numOfQuestions;
    this._dataMenu.setActiveNumOfQuestions(numOfQuestions);
    console.log(this.activeNumOfQuestions);
  }
  public changeActiveBlockTests(blockTests: number): void {
    this.activeBlockTests = blockTests;
    this._dataMenu.setActiveBlockTests(blockTests);
    console.log(this.activeBlockTests);
  }
}
