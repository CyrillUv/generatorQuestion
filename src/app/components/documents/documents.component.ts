import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { IQuestion, NameDataType } from '../../data/question/type';
import { QuestionService } from '../../data/question/question.service';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [RouterLink, NgIf, RouterOutlet],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent implements OnInit {
  public categories!: NameDataType[];
  public questions!: IQuestion[];

  constructor(private dataService: QuestionService) {}

  ngOnInit(): void {
    this.categories = this.dataService.getCategories();
  }

  public getQuestions(category: NameDataType): void {
    this.questions = this.dataService.getQuestions(category);
  }
}
