import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'orders-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: [],
})
export class CartIconComponent implements OnInit {
  cartCount= 0; // Initialize with a default value of 0
  constructor(private cartServise: CartService) {}

  ngOnInit(): void {
    this.cartServise.cart$.subscribe((cart) => {
      this.cartCount = cart?.items?.length ?? 0; // Use nullish coalescing to ensure a default of 0
    });
  }
}
