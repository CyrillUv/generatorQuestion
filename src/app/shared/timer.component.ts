import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { QuestionsTimerPipe } from '../components/questions/questions-timer.pipe';
import { interval } from 'rxjs';
import { TakeUntilDestroy } from './take-until-destroy';
@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [QuestionsTimerPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<h1 class="panel-testing__time">{{ time | Timer }}</h1>\n',
})
export class TimerComponent extends TakeUntilDestroy implements OnInit {
  public time = 0;
  constructor(public cdRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.startTimer();
  }
  public startTimer(): void {
    //Работа таймера
    this.takeUntilDestroy(interval(1000)).subscribe(() => {
      this.time += 1;
      this.cdRef.detectChanges();
    });
  }
}
