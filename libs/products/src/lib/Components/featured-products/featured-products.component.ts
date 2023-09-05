import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: [],
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {

  featuredProducts: Product[] =[] 
  endSubs$: Subject<any>= new Subject();
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this._getFeaturedProduct();
  }

  private _getFeaturedProduct(){
    this.productService.getFeaturedProducts(4).pipe(takeUntil(this.endSubs$)).subscribe(products=>{
      this.featuredProducts=products
    })
  }

  ngOnDestroy(){
    this.endSubs$;
    this.endSubs$.complete();
  }
}
