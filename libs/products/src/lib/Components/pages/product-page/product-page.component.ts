import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../models/product';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: [],
})
export class ProductPageComponent implements OnInit, OnDestroy {

  product!: Product;
  endSubs$: Subject<any>= new Subject();
  quantity!: number;

  constructor(private productServ: ProductsService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.params.subscribe(params =>{
      if(params['productid']){
        this._getProduct(params['productid']);
      }
    })
  }

  private _getProduct(id: string){
    this.productServ.getProduct(id).pipe(takeUntil(this.endSubs$)).subscribe(resProduct =>{
      this.product = resProduct;
    })
  }

  addProductToCart(){
    console.log('')
  }

  ngOnDestroy(){
    this.endSubs$;
    this.endSubs$.complete();
  }
}
