import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {combineLatest, distinctUntilKeyChanged, startWith, tap, timer} from 'rxjs';
import { ToastStateService } from './toast-state.service';

export enum ToastStatus {
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit {
  // появление тоста
  public activeToast = false;
  // обьект настроек для тоста
  public settings = {
    title: 'Success',
    type: ToastStatus.success,
    description: 'Message Content',
    timer: 3000,
  };

  constructor(private toastService: ToastStateService,
              private cdRef: ChangeDetectorRef
              ) {}

  ngOnInit(): void {
    combineLatest([
      this.toastService.activeToast$,
      this.toastService.changeConfig$.pipe(startWith(this.settings))
    ]).subscribe(([v, conf]) => {
      //активация тоста
      this.activeToast = v;
      //если тост активирован, он покажется и убирется через заданное время
      if (this.activeToast) {
        this.closeToastOfTime();
      }
      if (conf) {
        this.settings = { ...this.settings, ...conf };
      }
      this.cdRef.detectChanges();
    })
  }
  //закрытие тоста
  public closeToast(): void {
    this.toastService.activeToast$.next(false);
  }
  //задает время через которое тоста закроется
  private closeToastOfTime() {
    timer(this.settings.timer)
      .pipe(tap(() => this.closeToast()))
      .subscribe();
  }
}
