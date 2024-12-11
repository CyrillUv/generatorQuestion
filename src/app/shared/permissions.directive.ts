import {Directive, Input, TemplateRef, ViewContainerRef} from "@angular/core";
import {ApiAuthService, IUser} from "../components/auth/services/api-auth.service";


@Directive({
  selector: '[appPermissions]',
  standalone: true,
})
export class PermissionsDirective {
  // Условие для использования директивы
  @Input() set appPermissions(condition:boolean) {
    // Получите текущего пользователя и проверьте права доступа
    this.apiAuthService.getCurrentUser().subscribe(res=>{
      const currentUser:IUser = res[0]
    // Управляем отображением элемента в зависимости от прав доступа
      if (currentUser && currentUser.admin) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });



  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private apiAuthService: ApiAuthService
  ) {}
}
