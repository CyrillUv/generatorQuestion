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
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-custom-sidebar',
  standalone: true,
  templateUrl: 'sidebar.component.html',
  styleUrl: 'sidebar.component.scss',
  imports: [NgTemplateOutlet, NgIf],
  animations: [
    trigger('sidebar', [
      transition('open<=>closed', [animate('500ms')]),

      state('open', style({ transform: 'translateX(0%)' })),
      state('closed', style({ transform: 'translateX(-100%)' })),
    ]),
  ],
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
