import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnDestroy {
  @Output() closeEmitter = new EventEmitter<boolean>();
  @Output() toggleEmitter = new EventEmitter<boolean | null>();
  @Output() startEmitter = new EventEmitter();
  constructor() {
    document.body.classList.add('event-none');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('event-none');
  }
  public startAgain(): void {
    this.startEmitter.emit();
    this.closeModal();
  }

  public closeModal(): void {
    this.toggleEmitter.emit();
    this.closeEmitter.emit();
  }
}
