import {Component, OnInit} from "@angular/core";
import {RouterLink} from "@angular/router";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {DataTestService} from "../../../data/testing/dataTest.service";
import {IAnswer, IDataTest} from "../../../data/testing/type";
import {CorrectDirective} from "../../../directive/correct.directive.ts.directive";



@Component({
  selector: 'app-panel-testing',
  templateUrl: 'panelTesting.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    CorrectDirective,
    NgStyle,
    NgIf
  ],
  styleUrl: 'panelTesting.component.scss'
})
export class PanelTestingComponent implements OnInit {
  public page = 'Тестирование'
  public activeTest!: IDataTest
  public arrTest: Array<IDataTest> = []
  public successTestsMap:Map<number,IAnswer> = new Map()
  public selectAnswer = false;

  constructor(public dt: DataTestService) {
  }

  ngOnInit(): void {
    this.arrTest = this.dt.getData()
    this.activeTest = this.arrTest[0]
  }

  public findTest(id: number): void {
    this.activeTest = <IDataTest>this.arrTest.find(test => test.id === id)
    this.selectAnswer = this.successTestsMap.has(this.activeTest.id);
  }

  public clickAnswer(answer: IAnswer) {
    this.successTestsMap.set(this.activeTest.id,answer)
    this.selectAnswer = true;
  }
  public correctKeyInMap(id:number):boolean|undefined{
    if(!this.successTestsMap.has(id)) return;

      return (this.successTestsMap.get(id)?.correct as boolean)
  }
  public correctAnswerInMap(titlre: string):boolean|undefined{
   if(this.successTestsMap.has(this.activeTest.id)
    && this.successTestsMap.get(this.activeTest.id)?.title === titlre) {
       return this.successTestsMap.get(this.activeTest.id)?.correct
   } else return undefined
  }
}
