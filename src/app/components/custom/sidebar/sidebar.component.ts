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
@Component({
  selector: 'app-custom-sidebar',
  standalone: true,
  templateUrl: 'sidebar.component.html',
  styleUrl: 'sidebar.component.scss',
  imports: [NgTemplateOutlet, NgIf],
})
export class SidebarComponent {
  @Input() public headerTemplate!: TemplateRef<unknown>;
  @Input() public bodyTemplate!: TemplateRef<unknown>;
  @Input() public footerTemplate!: TemplateRef<unknown>;
  @Input() public triggerSidebar!: boolean | null;
  @Output() public closeEmitter = new EventEmitter<boolean>();

  public ms = inject(MenuService);

  public close(): void {
    this.ms.setSettingMode(false);
    this.closeEmitter.emit();
  }
}
