import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {DataService} from "../../data/data.service";
import {IQuestion, NameDataType} from "../../data/type";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent implements OnInit{
public categories!: Array<NameDataType>;
public questions!:Array<IQuestion>;

  constructor(private dataService: DataService) {
}

  ngOnInit(): void {
        this.categories = this.dataService.getCategories()
    }
    public getQuestions(category:NameDataType):void{
      this.questions = this.dataService.getQuestions(category)
    }

}
