import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Output() closeEmitter = new EventEmitter<boolean>();
  @Output() toggleEmitter = new EventEmitter<boolean | null>();
  public startAgain(): void {
    console.log('start');
    // this.qs.nullingActualQuestions();
    // this.ms.nullingPassedQuestions();
  }

  public closeModal(): void {
    this.toggleEmitter.emit();
    this.closeEmitter.emit();
  }
}
