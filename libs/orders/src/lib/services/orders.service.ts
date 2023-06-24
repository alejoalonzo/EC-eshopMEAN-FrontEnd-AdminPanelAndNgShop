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
  public url!: string;

  constructor(private http:HttpClient) { }

  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(this.apiURLorders);
  }
  // createProduct(productData: FormData): Observable<Product>{
  //   return this.http.post<Product>(this.apiURLproducts, productData);
  // }
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
}
