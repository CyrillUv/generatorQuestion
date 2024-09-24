import { Component, OnInit} from "@angular/core";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
import {DataTestService} from "../../../data/testing/dataTest.service";
import {IDataTest} from "../../../data/testing/type";


@Component({
  selector: 'app-panel-testing',
  templateUrl: 'panelTesting.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  styleUrl: 'panelTesting.component.scss'
})
export class PanelTestingComponent implements OnInit{
public page = 'Тестирование'
public activeTest!:IDataTest
public arrTest:Array<IDataTest> = []
  constructor(public dt:DataTestService) {
  }
  ngOnInit(): void {
    this.arrTest=this.dt.getData()
    this.activeTest=this.arrTest[0]
  }
  public findTest(id:number):void {
    console.log(this.activeTest);
   this.activeTest = <IDataTest>this.arrTest.find(test => test.id === id)
  }
}
