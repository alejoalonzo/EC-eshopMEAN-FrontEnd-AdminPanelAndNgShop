import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '@bluebits/users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderItem } from '../../models/order-item';
import { Order } from '../../models/orders';
import * as countriesLib from 'i18n-iso-countries';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { OrdersService } from '../../services/orders.service';
import { ORDER_STATUS_FRONT } from '../../constOrders';

declare const require: (arg0: string) => countriesLib.LocaleData;

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: [],
})
export class CheckoutPageComponent implements OnInit {

  checkoutForm!: FormGroup;
  isSubmitted!: boolean;
  countries: { id: string; name: string; }[] = [];
  currentUserId = '62f56d5846a0aa0b207f4ec7';
  orderItems : OrderItem[]=[]

  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService,  
  ) {}

  ngOnInit(): void {
    this._initFormCheckout();
    this._getCartItems();
    this._getCountries();
  }

  backToCartPage(){
    this.router.navigate(['/cart'])
  }

  placeOrder(){
    this.isSubmitted=true;
    if(this.checkoutForm.invalid){
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm.controls['street'].value, 
      shippingAddress2: this.checkoutForm.controls['number'].value, 
      city: this.checkoutForm.controls['city'].value, 
      zip: this.checkoutForm.controls['zip'].value, 
      phone: this.checkoutForm.controls['phone'].value, 
      status: 0, 
      user: this.currentUserId,
      dateOrdered: `${Date.now()}`,
    };
    
    this.ordersService.createOrder(order).subscribe(()=>{
      //redirec to the Thank you page
      this.cartService.emptyCart();
      this.router.navigate(['/success'])
      
    },()=>{
      // display error message to the client
    })
  }

  private _initFormCheckout(){
    this.checkoutForm = this.formBuilder.group({
      name:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      phone:[''],
      street:['', Validators.required],
      number:['', Validators.required],
      zip:['', Validators.required],
      city:['', Validators.required],
      country:['', Validators.required],
    })
  }

  private _getCountries(){
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries =Object.entries(countriesLib.getNames("en", {select: "official"})).map(entry=>{
      return {
        id: entry[0],
        name: entry[1]
      } 
    })
  }

  private _getCartItems() {
    const cart: Cart | null = this.cartService.getCart();
    if (cart) {
      this.orderItems = cart.items?.map((item) => {
        return {
          product: item.productId || '', 
          quantity: item.quantity || 0, 
        };
      }) || [];
    } else {
      // Handle the case when cart is null or undefined
      this.orderItems = [];
    }
  }

  get checkOutForm(){
    return this.checkoutForm.controls
  }
}
