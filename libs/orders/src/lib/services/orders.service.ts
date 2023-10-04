import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Order } from '../models/orders';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiURLorders = environment.apiURL+'orders';
  apiURLproducts = environment.apiURL+'products';
  public url!: string;

  constructor(private http:HttpClient) { }

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
}
