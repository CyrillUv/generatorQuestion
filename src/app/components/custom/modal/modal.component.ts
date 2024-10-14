import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() activeModal = false;

  @Output() closeEmitter = new EventEmitter();
  public startAgain(): void {
    console.log('start');
    // this.qs.nullingActualQuestions();
    // this.ms.nullingPassedQuestions();
  }

  public closeModal(): void {
    this.closeEmitter.emit();
  }
}
