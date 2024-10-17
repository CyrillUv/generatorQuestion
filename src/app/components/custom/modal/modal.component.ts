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
  @Input() public title = 'Вы точно уверены?';
  @Input() public bodyTemplate!: TemplateRef<unknown>;
  @Output() public activeModalEmitter = new EventEmitter<boolean>();
  @Output() public toggleEmitter = new EventEmitter<boolean | null>();
  public activeModal = false;
  constructor() {
    document.body.classList.add('event-none');
    this.activeModal = true;
  }

  ngOnDestroy(): void {
    document.body.classList.remove('event-none');
  }

  public closeModal(): void {
    this.activeModalEmitter.emit();
    this.toggleEmitter.emit();
    this.activeModal = false;
    document.body.classList.remove('event-none');
  }
}
