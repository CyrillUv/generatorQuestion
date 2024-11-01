import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

type CategoryRoute = Params & { title: string };

@Component({
  selector: 'app-category-doc',
  template: '<h1>{{name}}</h1>',
  standalone: true,
})
export class CategoryComponent implements OnInit {
  public name = '';
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.data.subscribe((r) => {});

    (this.route.params as Observable<CategoryRoute>).subscribe((res) => {
      this.name = res.title;
    });
  }
}
