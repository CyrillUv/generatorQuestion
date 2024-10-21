import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { IAnswer, IDataTest } from '../../../data/testing/type';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [NgForOf, NgTemplateOutlet, NgIf],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  @Input() public tests!: IDataTest[];
  @Input() public activeTest!: IDataTest;
  @Input() public separatorResult!: number;
  @Input() public fullMode!: boolean;
  @Input() public getSuccessTestsMap!: Map<number, IAnswer>;
  @Output() public activeTestEmitter = new EventEmitter<IDataTest>();
  @Output() public prevPackTestsEmitter = new EventEmitter();
  @Output() public nextPackTestsEmitter = new EventEmitter();
  @Output() public correctKeyInMapEmitter = new EventEmitter();
  public activatePage(pageNumber: IDataTest) {
    this.activeTest = pageNumber;
    this.activeTestEmitter.emit(pageNumber);
  }

  public prevPackTests() {
    this.prevPackTestsEmitter.emit();
  }

  public nextPackTests() {
    this.nextPackTestsEmitter.emit();
  }
  public correctKeyInMap(id: number): boolean | undefined {
    if (!this.getSuccessTestsMap.has(id)) return;
    return this.getSuccessTestsMap.get(id)?.correct as boolean;
  }
}
