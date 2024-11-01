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
  //Массив категорий
  public categories!: NameDataType[];
  //Массив вопросов
  public questions!: IQuestion[];

  constructor(private dataService: QuestionService) {}

  ngOnInit(): void {
    //Получение категорий из сервиса
    this.categories = this.dataService.getCategories();
  }

  public getQuestions(category: NameDataType): void {
    //Получение вопросов выбранной категории
    this.questions = this.dataService.getDocuments(category);
  }
}
