import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { MenuService } from '../../../data/menu/menu.service';
import { sidebar } from './sidebar.animations';

@Component({
  selector: 'app-custom-sidebar',
  standalone: true,
  templateUrl: 'sidebar.component.html',
  styleUrl: 'sidebar.component.scss',
  imports: [NgTemplateOutlet, NgIf],
  animations: sidebar,
})
export class SidebarComponent {
  //Верхняя часть шаблона
  @Input() public headerTemplate!: TemplateRef<unknown>;
  //Тело шаблона
  @Input() public bodyTemplate!: TemplateRef<unknown>;
  //Нижняя часть шаблона
  @Input() public footerTemplate!: TemplateRef<unknown>;
  //Флаг выдвижения сайдбара
  @Input() public triggerSidebar!: boolean | null;
  //Закрытие сайдбара
  @Output() public closingSidebarEmitter = new EventEmitter<boolean>();

  public ms = inject(MenuService);
  //Закрытие сайдбара
  public closingSidebar(): void {
    //Отключение режима настроек
    this.ms.setSettingMode(false);
    //Закрытие сайдбара
    this.closingSidebarEmitter.emit();
  }
}
