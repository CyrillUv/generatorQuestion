import {Component} from "@angular/core";
@Component({
  selector: 'app-testing-component',
  templateUrl:'testing.component.html',
  standalone:true,
  styleUrl:'testing.component.css'
})
export class TestingComponent{
public page = 'Тестирование'
}
