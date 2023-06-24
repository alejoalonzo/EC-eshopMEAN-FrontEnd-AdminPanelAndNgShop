import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService, Order } from '@bluebits/orders';
import { MessageService, ConfirmationService, ConfirmEventType  } from 'primeng/api';
import { ORDER_STATUS } from '../order-constants';
import { Location } from '@angular/common';

export type OrderStatus = {
  label: string;
  color: string;
};

export type OrderStatusMap = {
  [key: number]: OrderStatus;
};

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: [],
})
export class OrdersListComponent implements OnInit {

  orders: Order[] =[];
  public orderStatus= ORDER_STATUS;

  constructor(
    private odersService: OrdersService, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private locations: Location,
  ) {}

  ngOnInit(): void {
    this._getOrders ()
  }

  private _getOrders (){
    this.odersService.getOrders().subscribe((orders)=>{
      this.orders = orders;
    })
  }
  
  deleteOrder(orders: string){
    this.confirmationService.confirm({
      message: 'Do you want to delete this order?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.odersService.deleteOrder(orders).subscribe(()=>{
          this._getOrders ();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order is deleted successfuly' });
        },
        ()=>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Order is not created successfuly ' });
        });
      },
      reject: (type: unknown) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                  break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                  break;
          }
      }
    });
  }
  showOrderDetail(ordersId: string){
     this.router.navigateByUrl(`orders/${ordersId}`)
  }
  goBack(){
    this.locations.back();
  }
  
}
