import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../models/product';
import { Subject, takeUntil } from 'rxjs';
import { CartItem, CartService } from '@bluebits/orders';

@Component({
  selector: 'products-product-page',  
  templateUrl: './product-page.component.html',
  styleUrls: [],
})
export class ProductPageComponent implements OnInit, OnDestroy {

  product!: Product;
  endSubs$: Subject<any>= new Subject();
  quantity = 1;

  constructor(
    private productServ: ProductsService, 
    private router: ActivatedRoute, 
    private cartService: CartService,
  ) {}

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
    const cartItem : CartItem ={
      productId : this.product.id,
      quantity : this.quantity 
    };
    this.cartService.setCartItem(cartItem)
    this.cartService.show();
  }

  ngOnDestroy(){
    this.endSubs$;
    this.endSubs$.complete();
  }

}
