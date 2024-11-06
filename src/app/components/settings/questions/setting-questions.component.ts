import { RouterLink } from '@angular/router';

import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

import { NgForOf, NgIf } from '@angular/common';
import { ToggleComponent } from '../../custom/toggle/toggle.component';
import { SidebarComponent } from '../../custom/sidebar/sidebar.component';
import { ModalComponent } from '../../custom/modal/modal.component';
import { MenuService } from '../../../data/menu/menu.service';
import { QuestionService } from '../../../data/question/question.service';
import { IDataMenu, IOptions } from '../../../data/menu/data-menu';
import { MultiSelectComponent } from '../../custom/multi-select/multi-select.component';
import { SelectComponent } from '../../custom/select/select.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-setting-questions',
  templateUrl: 'setting-questions.component.html',
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
  ],
})
export class SettingsQuestionsComponent implements OnInit {
  //Форм группа
  public settingsForm!: FormGroup;
  //значение тогла
  public valueToggle!: boolean | null;
  //массив данных настроек
  public dataMenu!: IDataMenu[];
  //текущее количество вопросов
  //Иньекция меню сервиса
  public ms = inject(MenuService);
  //Иньекция сервиса вопросов
  public qs = inject(QuestionService);

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
  ) {
    //получение количества вопросов
    //присваивание данных настроек в локальную переменную
    this.dataMenu = this.ms.getData();
    //получение состояния тогла
    this.valueToggle = this.ms.getValueToggle();
  }

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      numOfQuestions: [
        this.ms.getCurrentNumOfQuestions(),
        [Validators.required, Validators.minLength(1)],
      ],
      levels: [
        this.qs.getActualLevels(),
        [Validators.required, Validators.minLength(0)],
      ],
      categories: [
        this.qs.getActualCategories(),
        [Validators.required, Validators.minLength(0)],
      ],
    });
    this.resetForm();
    this.triggerControls();
  }

  public triggerControls() {
    this.settingsForm.controls['levels'].markAsDirty();
    this.settingsForm.controls['categories'].markAsDirty();
    this.settingsForm.controls['levels'].markAsTouched();
    this.settingsForm.controls['categories'].markAsTouched();
    this.settingsForm.controls['levels'].updateValueAndValidity();
    this.settingsForm.controls['categories'].updateValueAndValidity();
    this.settingsForm.controls['numOfQuestions'].markAsTouched();
    this.settingsForm.controls['numOfQuestions'].markAsDirty();
    this.settingsForm.controls['numOfQuestions'].updateValueAndValidity();
    this.settingsForm.valueChanges.subscribe(() => {
      this.cdRef.detectChanges();
    });
  }

  //изменение состояния тогла
  public changeToggle(toggle: boolean): void {
    //обнуление состояния тогла
    this.valueToggle = null;
    //изменение состояния тогла глобально
    this.ms.setValueToggle(toggle);
    //открытие/закрытие модалки
    this.ms.setActiveModal(toggle);
  }
  public resetForm() {
    this.settingsForm.reset();
    this.triggerControls();
  }
  public fillingForm(): void {
    this.settingsForm.controls['levels'].setValue([
      { title: 'Junior' },
      { title: 'Middle' },
    ]);
    this.settingsForm.controls['categories'].setValue([
      { title: 'Структуры данных' },
      { title: 'TypeScript' },
      { title: 'JavaScript' },
    ]);
    this.settingsForm.controls['numOfQuestions'].setValue({
      title: '20 вопросов',
    });
  }
  public onCastType(value: boolean | undefined): boolean {
    return value as boolean;
  }

  public hidePanel(): void {
    this.ms.setSettingMode(false);
    this.settingsForm.reset();
    this.triggerControls();
  }

  //изменение количества вопросов
  public changeNumOfQuestions(option: IOptions): void {
    //задание текущего количества вопросов глобально
    this.ms.setCurrentNumOfQuestions(option.title);
  }

  public selectionCategory(categories: IOptions[]): void {
    this.qs.setActualCategories(categories);
    this.triggerControls();
  }

  public selectionLevels(levels: IOptions[]): void {
    this.qs.setActualLevels(levels);
    this.triggerControls();
  }
}
