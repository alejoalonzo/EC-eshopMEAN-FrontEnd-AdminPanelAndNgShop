import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styleUrls: [],
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {

  categories: Category [] = [];
  endSubs$: Subject<any>= new Subject();

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe((categories)=>{
      this.categories= categories
    })
  }

  ngOnDestroy(){
    this.endSubs$;
    this.endSubs$.complete();
  }
}
