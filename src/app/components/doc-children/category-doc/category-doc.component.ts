import {Component, inject, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable} from "rxjs";

type CategoryRoute = Params & { title: string}

@Component({
  selector: 'app-category-doc',
  template: '<h1>{{name}}</h1>',
  standalone: true,
})

export class CategoryComponent implements OnInit{
  public name = '';
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {

  }

  ngOnInit() {
    this.route.data.subscribe(r => {
      console.log('data', r)
    });

    (<Observable<CategoryRoute>>this.route.params).subscribe(res => {
      console.log('params', res)
      this.name=res.title;
    });
    // console.log(this.name)
  }

}