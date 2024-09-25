import {Component, OnInit} from "@angular/core";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
import {DataTestService} from "../../../data/testing/dataTest.service";
import {IDataTest} from "../../../data/testing/type";
import {CorrectDirectiveDirective} from "../../../directive/correct.directive.ts.directive";


@Component({
  selector: 'app-panel-testing',
  templateUrl: 'panelTesting.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    CorrectDirectiveDirective
  ],
  styleUrl: 'panelTesting.component.scss'
})
export class PanelTestingComponent implements OnInit {
  public page = 'Тестирование'
  public activeTest!: IDataTest
  public arrTest: Array<IDataTest> = []
  public solution: boolean | null = null
  public changePage!:boolean
  constructor(public dt: DataTestService) {
  }

  ngOnInit(): void {
    this.arrTest = this.dt.getData()
    this.activeTest = this.arrTest[0]
    this.changePage=true
    this.solution = null
  }

  public findTest(id: number): void {
    this.activeTest = <IDataTest>this.arrTest.find(test => test.id === id)
    this.changePage=true
    console.log(this.changePage)
    this.testSolution(null)
  }

  public testSolution(result: boolean | null) {

    this.solution = result

  }
}
