import {Component, OnInit} from "@angular/core";
import {RouterLink} from "@angular/router";
import {JsonPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
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
  public arrTest: IDataTest[] = []
  public selectAnswer = false;

  constructor(public dt: DataTestService) {
  }

  ngOnInit(): void {
    this.arrTest = this.dt.getData()
    this.activeTest = this.arrTest[0]
  }

  public findTest(id: number): void {
    this.activeTest = this.arrTest.find(test => test.id === id) as IDataTest
    this.selectAnswer = this.dt.getSuccessTestsMap().has(this.activeTest.id);
  }

  public clickAnswer(answer: IAnswer) {
    this.dt.setSuccessTestsMap(this.activeTest.id,answer);
    this.selectAnswer = true;
  }
  public correctKeyInMap(id:number):boolean|undefined{
    if(!this.dt.getSuccessTestsMap().has(id)) return;

      return (this.dt.getSuccessTestsMap().get(id)?.correct as boolean)
  }
  public correctAnswerInMap(title: string):boolean|undefined{
   if(this.dt.getSuccessTestsMap().has(this.activeTest.id)
    && this.dt.getSuccessTestsMap().get(this.activeTest.id)?.title === title) {
       return this.dt.getSuccessTestsMap().get(this.activeTest.id)?.correct
   } else return undefined
  }
}
