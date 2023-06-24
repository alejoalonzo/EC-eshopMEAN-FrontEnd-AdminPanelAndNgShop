import { Component, OnInit } from '@angular/core';
import { OrdersService, Order } from '@bluebits/orders';
import { ActivatedRoute } from '@angular/router';
import { ORDER_STATUS } from '../order-constants';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';

type OrderStatusOption = {
  id: number;
  name: string;
};

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: [],
})
export class OrdersDetailComponent implements OnInit {

  order!: Order;
  orderStatuses: OrderStatusOption[] = [];
  orderSelected: any;

  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private locations: Location,
  ) {}

  ngOnInit(): void {
    this._getOrder();
    this._mapOrderStatus();
  }
  private _mapOrderStatus(){
     this.orderStatuses = Object.keys(ORDER_STATUS).map((key: any)=>{
      return{
        id: key,
        name: ORDER_STATUS[key].label
      }
    })
  }

  private _getOrder(){
    this.route.params.subscribe(params =>{
      if(params['id']){
        this.orderService.getOrder(params['id']).subscribe((order)=>{
          this.order = order;
          this.orderSelected = order.status;
        })
      }
    })  
  }
  onStatusChange(event: any) {
    if (this.order && this.order.id) {
      this.orderService.updateOrder({ status: event.value }, this.order.id).subscribe(order => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Order ${order} is updated successfully` });
        timer(1000).toPromise().then(() => {
          this.locations.back();
        });
      });
    }
  }
  goBack(){
    this.locations.back();
  }

}
