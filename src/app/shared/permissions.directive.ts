import {
  Directive,
  Inject,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { IUser } from '../components';
import { CURRENT_USER_TOKEN$ } from '../data';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[appPermissions]',
  standalone: true,
})
export class PermissionsDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    @Inject(CURRENT_USER_TOKEN$) private currentUser$: BehaviorSubject<IUser>,
  ) {}

  ngOnInit(): void {
    // Управляем отображением элемента в зависимости от прав доступа
    if (this.currentUser$.value.admin) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
