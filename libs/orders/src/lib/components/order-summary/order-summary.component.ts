import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil, take } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'orders-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: [],
})
export class OrderSummaryComponent implements OnInit {

  endSubs$ : Subject<any>= new Subject()
  totalPrice!: number
  isCheckout=false

  constructor(
    private cartService: CartService, 
    private orderService: OrdersService,
    private router: Router) {
      this.router.url.includes('checkout') ? this.isCheckout = true : this.isCheckout=false
    }

 

  ngOnInit(): void {
    this._getOrderSummary();
  }

  private _getOrderSummary(){
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart)=>{
      this.totalPrice=0;
      if(cart){
        cart.items?.map((item)=>{
          if(item.productId){
            this.orderService.getProduct(item.productId).pipe(take(1)).subscribe(product => {
              if(item.quantity){
                this.totalPrice += product.price * item.quantity; 
              } 
            })
          }
        })
      }
    })
  }

  navigateToCheckoutPage(){
    this.router.navigate(['/checkout'])
  }
}
