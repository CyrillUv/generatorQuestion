import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
} from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgTemplateOutlet, NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnDestroy {
  //Входящий заголовок
  @Input() public title = 'Вы точно уверены?';
  //Тело компонента
  @Input() public bodyTemplate!: TemplateRef<unknown>;
  //показывает/скрывает модалку
  @Output() public activeModalEmitter = new EventEmitter<boolean>();
  //двигает тогл
  @Output() public toggleEmitter = new EventEmitter<boolean | null>();
  //активность модалки
  public activeModal = false;
  constructor() {
    //рабочая область толька у модалки
    document.body.classList.add('event-none');
    //показ модалки
    this.activeModal = true;
  }

  ngOnDestroy(): void {
    //глобальная рабочая область
    document.body.classList.remove('event-none');
  }
  //Закрытие модалки
  public closeModal(): void {
    //показывает/скрывает модалку
    this.activeModalEmitter.emit();
    //двигает тогл
    this.toggleEmitter.emit();
    //закрыватие модалки
    this.activeModal = false;
    //глобальная рабочая область
    document.body.classList.remove('event-none');
  }
}
