import { Router, RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import {
  ModalComponent,
  MultiSelectComponent,
  SelectComponent,
  SidebarComponent,
  ToggleComponent,
} from '../../custom';
import {
  IDataMenu,
  IOptions,
  MenuService,
  QuestionService,
} from '../../../data';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { timer } from 'rxjs';

interface IModels {
  levels: IOptions[] | null;
  categories: IOptions[] | null;
  numberOfQuestions: IOptions | null;
}

@Component({
  selector: 'app-setting-questions',
  templateUrl: 'setting-question-model.component.html',
  styleUrl: '../settings.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    ToggleComponent,
    NgForOf,
    NgIf,
    SidebarComponent,
    ModalComponent,
    MultiSelectComponent,
    SelectComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class SettingsQuestionsComponent implements OnInit {
  //Форм группа
  // public settingsForm!: FormGroup;
  //значение тогла
  public valueToggle!: boolean | null;
  //массив данных настроек
  public dataMenu!: IDataMenu[];
  //текущее количество вопросов
  //Иньекция меню сервиса
  public ms = inject(MenuService);
  //Иньекция сервиса вопросов
  public qs = inject(QuestionService);

  public models: IModels = {
    levels: null,
    categories: null,
    numberOfQuestions: null,
  };

  constructor(private router: Router) {
    // private cdRef: ChangeDetectorRef, // private fb: FormBuilder,
    //получение количества вопросов
    //присваивание данных настроек в локальную переменную
    this.dataMenu = this.ms.getData();
    //получение состояния тогла
    this.valueToggle = this.ms.getValueToggle();
  }

  ngOnInit(): void {
    this.models = {
      levels: this.qs.getActualLevels(),
      numberOfQuestions: this.ms.getCurrentNumOfQuestions(),
      categories: this.qs.getActualCategories(),
    };
    this.modelsValidator();
    // this.settingsForm = this.fb.group({
    //   numOfQuestions: [
    //     this.ms.getCurrentNumOfQuestions(),
    //     [Validators.required, Validators.minLength(1)],
    //   ],
    //   levels: [
    //     this.qs.getActualLevels(),
    //     [Validators.required, Validators.minLength(0)],
    //   ],
    //   categories: [
    //     this.qs.getActualCategories(),
    //     [Validators.required, Validators.minLength(0)],
    //   ],
    // });
    // this.triggerControls();
  }

  // public triggerControls() {
  //   this.settingsForm.controls['levels'].markAsDirty();
  //   this.settingsForm.controls['categories'].markAsDirty();
  //   this.settingsForm.controls['levels'].markAsTouched();
  //   this.settingsForm.controls['categories'].markAsTouched();
  //   this.settingsForm.controls['levels'].updateValueAndValidity();
  //   this.settingsForm.controls['categories'].updateValueAndValidity();
  //   this.settingsForm.controls['numOfQuestions'].markAsTouched();
  //   this.settingsForm.controls['numOfQuestions'].markAsDirty();
  //   this.settingsForm.controls['numOfQuestions'].updateValueAndValidity();
  // }

  //изменение состояния тогла
  public changeToggle(toggle: boolean): void {
    //обнуление состояния тогла
    this.valueToggle = null;
    //изменение состояния тогла глобально
    this.ms.setValueToggle(toggle);
    //открытие/закрытие модалки
    this.ms.setActiveModal(toggle);
  }

  public resetModels(): void {
    // Object.values(this.models)
    (Object.keys(this.models) as (keyof IModels)[]).forEach((key) => {
      this.models[key] = null; // Зануляем все свойства
    });
  }

  // public resetForm() {
  //   this.settingsForm.reset();
  //   this.triggerControls();
  // }
  // public fillingForm(): void {
  //   this.settingsForm.controls['levels'].setValue([
  //     { title: 'Junior' },
  //     { title: 'Middle' },
  //   ]);
  //   this.settingsForm.controls['categories'].setValue([
  //     { title: 'Структуры данных' },
  //     { title: 'TypeScript' },
  //     { title: 'JavaScript' },
  //   ]);
  //   this.settingsForm.controls['numOfQuestions'].setValue({
  //     title: '20 вопросов',
  //   });
  // }
  // public onCastType(value: boolean | undefined): boolean {
  //   return value as boolean;
  // }
  public modelsValidator(): boolean {
    return Object.values(this.models).some(
      (value) => value === null || value?.length === 0,
    );
  }

  public hidePanel(): void {
    this.ms.setSettingMode(false);
    // this.resetForm();
    // this.triggerControls();
  }

  //изменение количества вопросов
  public changeNumOfQuestions(option: IOptions): void {
    //задание текущего количества вопросов глобально
    this.ms.setCurrentNumOfQuestions(option);
  }

  public selectionCategory(categories: IOptions[]): void {
    this.qs.setActualCategories(categories);
    // this.triggerControls();
  }

  public selectionLevels(levels: IOptions[]): void {
    this.qs.setActualLevels(levels);
    // this.triggerControls();
  }

  public modelsChange() {
  }

  public fillingModels() {
    // this.models.categories = [
    //   { title: 'Структуры данных' },
    //   { title: 'TypeScript' },
    //   { title: 'JavaScript' },
    // ];
    // this.models.levels = [{ title: 'Junior' }, { title: 'Middle' }];
    // this.models.numberOfQuestions = { title: '20 вопросов' };
    this.models = {
      categories: [
        { title: 'Структуры данных' },
        { title: 'TypeScript' },
        { title: 'JavaScript' },
      ],
      levels: [{ title: 'Junior' }, { title: 'Middle' }],
      numberOfQuestions: { title: '20 вопросов' },
    };
  }

  public begin() {
    timer(3000).subscribe(() => {
      this.ms.setSettingMode(null);
      const route = this.ms.getRoute();
      setTimeout(() => {
        this.router.navigate([route]).then((r) => r);
      }, 2000);
    });
  }
}
