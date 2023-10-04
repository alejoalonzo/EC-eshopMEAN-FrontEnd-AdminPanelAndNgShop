import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { CartItemDetailed } from '../../models/cart';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: [],
})
export class CartPageComponent implements OnInit, OnDestroy {
  
  cartItemsDetailed : CartItemDetailed[] =[];
  cartCount= 0; // Initialize with a default value of 0
  endSubs$ : Subject<any>= new Subject()

  constructor(
    private router: Router, 
    private cartServise: CartService,
    private ordersService: OrdersService,
  ) {}

  ngOnInit(): void {
    
    this._getCartDetails();
  }

  ngOnDestroy() {
    // this.endSubs$.next();
    this.endSubs$.complete();
  }

  backToShop(){
    this.router.navigate(['/products'])
  }
  deleteCartItem(cartItem: CartItemDetailed){
    this.cartServise.deleteCartItem(cartItem.product.id)
  }

  private _getCartDetails() {
    this.cartServise.cart$.pipe(takeUntil(this.endSubs$)).subscribe((respCart) => {
      this.cartItemsDetailed = []
      this.cartCount = respCart?.items?.length ?? 0; // Use nullish coalescing to ensure a default of 0
      respCart?.items?.forEach((cartItem) => {
        if (cartItem.productId !== undefined) {
          this.ordersService.getProduct(cartItem.productId).subscribe((respProducts) => {
            this.cartItemsDetailed.push({
              product: respProducts,
              quantity: cartItem.quantity
            })
          });
        }
      });
    });
  }

  updateCartItemQuantity(event: any, cartItem: CartItemDetailed){
    this.cartServise.setCartItem({
      productId: cartItem.product.id,
      quantity: event.value
    }, true)
  }

}
