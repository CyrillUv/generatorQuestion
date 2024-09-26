import {Component, OnInit} from "@angular/core";
import {RouterLink} from "@angular/router";
import {NgForOf, NgStyle} from "@angular/common";
import {DataTestService} from "../../../data/testing/dataTest.service";
import {IDataTest} from "../../../data/testing/type";
import {CorrectDirective} from "../../../directive/correct.directive.ts.directive";

@Component({
  selector: 'app-panel-testing',
  templateUrl: 'panelTesting.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    CorrectDirective,
    NgStyle
  ],
  styleUrl: 'panelTesting.component.scss'
})
export class PanelTestingComponent implements OnInit {
  public page = 'Тестирование'
  public activeTest!: IDataTest
  public arrTest: Array<IDataTest> = []
  public solution: boolean | null = null
  public SuccessTests:Map<number,boolean> = new Map()
  public changePage!: boolean

  constructor(public dt: DataTestService) {
  }

  ngOnInit(): void {
    this.arrTest = this.dt.getData()
    this.activeTest = this.arrTest[0]
    this.changePage = true
    this.solution = null
  }
  public createSuccessTests(id:number,state:boolean):void{
    this.SuccessTests.set(id,state)
  }
  public findTest(id: number): void {
    if(!this.SuccessTests.has(id)&&this.solution!==null){
      this.createSuccessTests(this.activeTest.id,this.solution)
    }
    this.activeTest = <IDataTest>this.arrTest.find(test => test.id === id)
    this.changePage = true

    this.testSolution(null)

    console.log(this.SuccessTests)
  }


  public testSolution(result: boolean | null) {
    this.solution = result

  }
}
