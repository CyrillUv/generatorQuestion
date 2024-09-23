import { Component, OnInit} from "@angular/core";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
interface ICell {
  item:number,
  state:boolean|null
}

@Component({
  selector: 'app-panel-testing',
  templateUrl: 'panelTesting.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  styleUrl: 'panelTesting.component.scss'
})
export class PanelTestingComponent implements OnInit{

public page = 'Тестирование'
public arrCeil:Array<ICell> = []
  ngOnInit(): void {
    this.formationArray()
  }
public formationArray():Array<ICell>{
  for(let i=1; i<=10;i++) {
    this.arrCeil.push({item:i,state:null})

  }
  return this.arrCeil
}
public falsing(element:ICell):void{
  // @ts-ignore
 this.arrCeil.find(el=>el===element).state=false
}
  public truing(element:ICell):void{
     // @ts-ignore
    this.arrCeil.find(el=>el===element).state=true
  }
}
