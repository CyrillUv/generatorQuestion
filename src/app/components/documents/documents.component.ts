import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../custom/sidebar/sidebar.component';
import { CategoryQuestionsComponent } from './category-questions/category-questions.component';
import { DocumentCategoriesComponent } from './document-categories/document-categories.component';
import { ModalComponent } from '../custom/modal/modal.component';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    RouterOutlet,
    FormsModule,
    NgForOf,
    SidebarComponent,
    CategoryQuestionsComponent,
    DocumentCategoriesComponent,
    ModalComponent,
  ],
  templateUrl: './documents.component.html',
})
export class DocumentsComponent {
  //текущая категория
  public currentCategory!: string;
  //Запросы с фронт вмешательством
  public localStorageAPI!: boolean;

  constructor(private cdRef: ChangeDetectorRef) {}
  //разделение запросов на серверное и временное локальное хранилище
  public serverCategories = [
    '/git',
    '/algorithms',
    '/linux',
    '/rxjs',
    '/css',
    '/net-protocols',
  ];
  //изменение текущей категории вопросов
  public setCurrentCategory(category: string): void {
    this.currentCategory = category;
    //если категория не входит в массив категорий серверной стороны,то к ним приготовлен измененный функционал
    this.localStorageAPI = !this.serverCategories.includes(
      this.currentCategory,
    );
    this.cdRef.detectChanges();
  }
}
