import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '@bluebits/users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderItem } from '../../models/order-item';
import { Order } from '../../models/orders';
import * as countriesLib from 'i18n-iso-countries';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { OrdersService } from '../../services/orders.service';
import { Subject } from 'rxjs';


declare const require: (arg0: string) => countriesLib.LocaleData;

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: [],
})
export class CheckoutPageComponent implements OnInit, OnDestroy {

  checkoutForm!: FormGroup;
  isSubmitted!: boolean;
  countries: { id: string; name: string; }[] = [];
  currentUserId = '62f56d5846a0aa0b207f4ec7';
  endSubs$: Subject<any>= new Subject();
  // currentUserId? : string;
  orderItems : OrderItem[]=[]
  endSuscribes$: Subject<any>= new Subject()

  constructor(
    private router: Router,
    // private route: ActivatedRoute,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService,  
  ) {}

  ngOnInit(): void {
    this._initFormCheckout();
    this._autofillUserData();
    this._getCartItems();
    this._getCountries();
    // this._autofillUserDataFromServise(id);
  }

  ngOnDestroy() {
    // this.endSubs$.next();
    this.endSuscribes$.complete();
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

    this.ordersService.cacheOrderData(order)

    this.ordersService.createCheckoutSession(this.orderItems).subscribe(error=>{
      if(error){
        console.log('error in Checkout Session Payment')
      }
    })
    
  }

  private _initFormCheckout(){
    this.checkoutForm = this.formBuilder.group({
      name:['Alejandro Alonzo Galdamez', Validators.required],
      email:['alejo12@gmail.com', [Validators.required, Validators.email]],
      phone:[''],
      street:['Calle 8 de Marzo', Validators.required],
      number:['74', Validators.required],
      zip:['08950', Validators.required],
      city:['Barcelona', Validators.required],
      country:['', Validators.required],
    })
  }

  //HAVE TO CHECK WHATS GOING ON WITH NGRX

  private _autofillUserData() {
    /*
    this.usersService.observCurrentUser().subscribe((user) => {
      if (user) {
        this.checkoutForm.controls['name'].setValue(user.name);
      } else {
        console.error('User or user.name is undefined:', user);
      }
    });*/
  }

  // private _autofillUserDataFromServise(id: string) {
  //   this.usersService.getUser(id).pipe(takeUntil(this.endSubs$)).subscribe((user) => {
  //     this.currentUserId = user._id;
  //     this.checkoutForm.controls['name'].setValue(user.name);
  //     console.log(user._id);
  //   });
  // }
  

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
