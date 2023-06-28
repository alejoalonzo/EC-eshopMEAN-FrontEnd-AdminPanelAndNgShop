import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService, Product } from '@bluebits/products';
import { OrdersService, Order } from '@bluebits/orders';
import { UsersService, User } from '@bluebits/users'
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  products: Product[] = []; 
  orders: Order[] =[];
  users: User[] =[];
  totalSales!: any;

  //End Subscription for performance, used in onDestry
  endsubs$: Subject<any> = new Subject();

  constructor(
    private productService: ProductsService,
    private odersService: OrdersService,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this._getProducts();
    this._getOrders();
    this._getUsers();
    this.getTotalSales();
  }
  ngOnDestroy(){
    this.endsubs$.complete();
  }

  private _getProducts(){
    this.productService.getProducts().pipe(takeUntil(this.endsubs$)).subscribe(products=>{
      this.products = products;
    })
  } 

  private _getOrders (){
    this.odersService.getOrders().pipe(takeUntil(this.endsubs$)).subscribe((orders)=>{
      this.orders = orders;
    })
  }
  private _getUsers (){
    this.usersService.getUsers().pipe(takeUntil(this.endsubs$)).subscribe((users)=>{
      this.users = users;
    })
  }
  getTotalSales(): void {
    this.odersService.getTotalSales().pipe(takeUntil(this.endsubs$)).subscribe(total => {
      this.totalSales = total;
      //console.log(total)
    });
  }

}
