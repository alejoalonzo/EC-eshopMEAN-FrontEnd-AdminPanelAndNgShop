import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { CategoriesService } from '../../../services/categories.service';
import { Product } from '../../../models/product';
import { Category } from '../../../models/category';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
 

@Component({
  selector: 'products-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: [],
})
export class ProductsListComponent implements OnInit, OnDestroy {

  getProducts: Product[] =[] 
  getCategories: Category[] =[] 
  endSubs$: Subject<any>= new Subject();
  isCategoryPage!: boolean;

  constructor(private productsService: ProductsService, private categoriesService: CategoriesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['categoryid']) {
        this._getProducts([params['categoryid']]);
        this.isCategoryPage = true;
      } else {
        this._getProducts();
        this.isCategoryPage = false;
      }
    });
    
    this._getCategories();
  }

  private _getProducts(categoryFilter?: any){
    this.productsService.getProducts(categoryFilter).pipe(takeUntil(this.endSubs$)).subscribe(resProducts=>{
      this.getProducts=resProducts
    })
  }

  private _getCategories(){
    this.categoriesService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(resCategories=>{
      this.getCategories=resCategories
    })
  }

  ngOnDestroy(){
    this.endSubs$;
    this.endSubs$.complete();
  }
  categoryFilter(){
    const selectedCategory = this.getCategories.filter(category => category.checked).map((category)=>category._id)
    this._getProducts(selectedCategory)
  }
}
