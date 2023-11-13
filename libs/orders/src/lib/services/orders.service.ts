import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs'
import { Order } from '../models/orders';
// import { environment } from '@env/environment';
import { environment } from '../../environments/environment';
import { OrderItem } from '../models/order-item';
import { StripeService } from 'ngx-stripe';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiURLorders = environment.apiURL+'orders';
  apiURLproducts = environment.apiURL+'products';
  public url!: string;

  constructor(private http:HttpClient, private stripeService: StripeService) { }

  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(this.apiURLorders);
  }
  createOrder(order: Order): Observable<Order>{
    return this.http.post<Order>(this.apiURLorders, order);
  }
  getOrder(orderId: string): Observable<Order>{
    return this.http.get<Order>(`${this.apiURLorders}/${orderId}`);
  }
  updateOrder(orderStatus: {status: string}, orderId: string): Observable<Order>{
    return this.http.put<Order>(`${this.apiURLorders}/${orderId}`, orderStatus);
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  deleteOrder(orderId: string): Observable<unknown>{
    // eslint-disable-next-line @typescript-eslint/ban-types
    return this.http.delete<unknown>(`${this.apiURLorders}/${orderId}`);
  }

  getTotalSales(): Observable<number> {
    return this.http.get<number>(`${this.apiURLorders}/get/totalsales`);
  }

  getProduct(productId: string): Observable<any>{
    return this.http.get<any>(`${this.apiURLproducts}/${productId}`);
  }

  createCheckoutSession(orderItem: OrderItem[]) {
    return this.http.post(`${this.apiURLorders}/create-checkout-session`, orderItem).pipe(
      switchMap((session: any) => {
        return this.stripeService.redirectToCheckout({ sessionId: session.id });
      })
    );
  }

  cacheOrderData(order:Order){
    localStorage.setItem('orderData', JSON.stringify(order))
  }

  getCachedOrderData():Order{
    return JSON.parse(localStorage.getItem('orderData')|| '{}');
  }

  removeCachedOrderData(){
    localStorage.getItem('orderData');
  }

}
