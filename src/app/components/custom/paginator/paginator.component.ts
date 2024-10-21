import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { IAnswer, IDataTest } from '../../../data/testing/type';

//Компонент
@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [NgForOf, NgTemplateOutlet, NgIf],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  //Массив тестов (блок тестов разбитый сепаратором)
  @Input() public tests!: IDataTest[];
  //Активный тест
  @Input() public activeTest!: IDataTest;
  //Мапа с правильными ответами выбранными пользователем
  @Input() public getSuccessTestsMap!: Map<number, IAnswer>;
  //Инпуты ниже нужны при прохождении всех тестов сразу,без деления на блоки
  //Длина глобального массива тестов
  @Input() public lengthOfAllData!: number;
  //Режим прохождения всех тестов
  @Input() public fullMode!: boolean;
  //Изменение активного теста
  @Output() public activeTestEmitter = new EventEmitter<IDataTest>();
  //Предыдущая пачка тестов
  @Output() public prevPackTestsEmitter = new EventEmitter();
  //Следующая пачка тестов
  @Output() public nextPackTestsEmitter = new EventEmitter();

  //Изменение активного теста на входящий
  public activatePage(test: IDataTest) {
    //Присваивание входящего теста
    this.activeTest = test;
    //Прокидывание входящего теста для изменения активного в родительском компоненте
    this.activeTestEmitter.emit(test);
  }
  //Получение предыдущей пачки тестов
  public prevPackTests() {
    this.prevPackTestsEmitter.emit();
  }
  //Получение следующей пачки тестов
  public nextPackTests() {
    this.nextPackTestsEmitter.emit();
  }
  //Отображение правильно и неправильно отвеченного теста
  public answerToTheTest(id: number): boolean | undefined {
    //Если в мапе не найден обьект с таким идентификатором,выходим из метода
    if (!this.getSuccessTestsMap.has(id)) return;
    //Возвращает флаг выбранного ответа на тест
    return this.getSuccessTestsMap.get(id)?.correct as boolean;
  }
}
