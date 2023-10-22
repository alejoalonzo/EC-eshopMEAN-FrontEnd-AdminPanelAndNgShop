import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'orders-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: [],
})
export class ThankYouComponent implements OnInit {
  constructor(private ordersService: OrdersService, private cartService: CartService) {}

  ngOnInit(): void {
    const orderData = this.ordersService.getCachedOrderData();
      this.ordersService.createOrder(orderData).subscribe(()=>{
        this.cartService.emptyCart();
        this.ordersService.removeCachedOrderData();
      })
  }
    //   this.router.navigate(['/success'])
}
