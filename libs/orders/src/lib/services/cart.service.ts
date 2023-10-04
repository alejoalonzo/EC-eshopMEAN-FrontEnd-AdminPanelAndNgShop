import { Injectable } from '@angular/core';
import { CartItem, Cart } from '../models/cart';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';

export const CART_KEY = "cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor( private messageService: MessageService) { }
  cart$: BehaviorSubject<Cart | null> = new BehaviorSubject(this.getCart()) 

  initCartLocalStorage(){
    const cart: Cart | null = this.getCart();
    if(!cart){
      const initCart ={
        items:[]
      }    
      
      const InitCartJson = JSON.stringify(initCart)
      localStorage.setItem(CART_KEY, InitCartJson)
    }
  }

  emptyCart(){
    const initCart = {
      items:[]
    }
    const InitCartJson = JSON.stringify(initCart)
    localStorage.setItem(CART_KEY, InitCartJson)
    this.cart$.next(initCart);
  }

  getCart(): Cart | null {
    const cartJsonString: string | null = localStorage.getItem(CART_KEY);
    if (cartJsonString !== null) {
      const cart: Cart = JSON.parse(cartJsonString);
      return cart;
    } else {
      // Handle the case where the cart data is not found in localStorage.
      return null;
    }
  }

  setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart | null {
    let cart = this.getCart();
    const cartItemExist = cart?.items?.find((item) => item.productId === cartItem.productId);
  
    // check if the item exists, if so, add quantity, otherwise add the item itself
    if (cartItemExist) {
      cart?.items?.forEach((item) => {
        if (item.productId === cartItem.productId) {
          if(updateCartItem){
            item.quantity = cartItem.quantity
          }else{
            item.quantity = (item.quantity ?? 0) + (cartItem.quantity ?? 0);
          }
        }return item
      });
    } else {
      if (!cart) {
        // If cart is null, initialize it with an empty items array.
        cart = { items: [] };
      }
      cart.items?.push(cartItem);
    }
  
    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJson);
    
    if (cart){
      this.cart$.next(cart);
    }
    
    return cart;
  }

  deleteCartItem( productId: string){
    const cart = this.getCart();
    const newCart = cart?.items?.filter(item => item.productId !== productId)

    if(cart?.items){
      cart.items = newCart;
    }
    const cartJsonString = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJsonString);

    if (cart){
      this.cart$.next(cart);
    }
  }


  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added to Cart' });
  }

}
