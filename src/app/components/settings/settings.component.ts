import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../data/menu/menu.service';
import { RouterLink } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { IDataMenu } from '../../data/menu/data-menu';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterLink, NgForOf, NgIf],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  public dataMenu!: IDataMenu[];
  public activeNumOfQuestions = 20;
  public activeBlockTests = 1;
  constructor(public ms: MenuService) {}

  ngOnInit(): void {
    this.dataMenu = this.ms.getData();
  }
  public changeNumOfQuestions(numOfQuestions: number): void {
    this.activeNumOfQuestions = numOfQuestions;
    this.ms.setActiveNumOfQuestions(numOfQuestions);
    console.log(this.activeNumOfQuestions);
  }
  public changeActiveBlockTests(blockTests: number): void {
    this.activeBlockTests = blockTests;
    this.ms.setActiveBlockTests(blockTests);
    console.log(this.activeBlockTests);
  }
}
