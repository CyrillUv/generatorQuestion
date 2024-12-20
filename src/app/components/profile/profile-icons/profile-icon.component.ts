import {Component, Input} from "@angular/core";
import {ProfileStateService} from "../services/profile-state.service";

@Component({
  selector: "app-profile-icon",
  standalone:true,
  templateUrl:'profile-icon.component.html',
  styleUrl: "../profile.component.scss"
})

export class ProfileIconComponent {
  @Input() public src!:string;
  @Input() public activeIcon!:boolean;
  constructor(public profileService:ProfileStateService) {

  }
}
