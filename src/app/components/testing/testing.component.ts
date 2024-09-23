import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
interface ICell {
  item:number,
  state:boolean|null
}

@Component({
  selector: 'app-testing-component',
  templateUrl: 'testing.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  styleUrl: 'testing.component.scss'
})
export class TestingComponent implements OnInit{

public page = 'Тестирование'
public arr:Array<ICell> = []
  ngOnInit(): void {
    this.formationArray()
  }
public formationArray():Array<ICell>{
  for(let i=1; i<=10;i++) {
    this.arr.push({item:i,state:null})

  }
  return this.arr
}
public falsing(element:ICell):void{
  // @ts-ignore
 this.arr.find(el=>el===element).state=false
}
  public truing(element:ICell):void{
     // @ts-ignore
    this.arr.find(el=>el===element).state=true
  }
}
