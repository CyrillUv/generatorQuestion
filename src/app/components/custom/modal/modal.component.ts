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
  //закрытие модалки
  @Output() public closeEmitter = new EventEmitter<boolean>();

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
    //закрывает модалку
    this.closeEmitter.emit();
    //закрывает модалку
    this.activeModal = false;
    //глобальная рабочая область
    document.body.classList.remove('event-none');
  }
}
