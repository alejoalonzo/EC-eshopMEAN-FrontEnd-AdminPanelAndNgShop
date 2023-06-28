import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService, Product } from '@bluebits/products';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService, ConfirmEventType  } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: [],
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products: Product[] = [];  
  //End Subscription for performance, used in onDestry
  endsubs$: Subject<any> = new Subject();
 
  constructor(
    private productService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}
  first = 0;

  rows = 10;

  onPageChange(event: { first: number; rows: number; }) {
      this.first = event.first;
      this.rows = event.rows;
  }

  ngOnInit(): void {
    this._getProducts();
  }
  ngOnDestroy(){
    this.endsubs$.complete();
  }

  private _getProducts(){
    this.productService.getProducts().pipe(takeUntil(this.endsubs$)).subscribe(products=>{
      this.products = products;
    })
  } 

  editProduct(productId: unknown){
    this.router.navigateByUrl(`products/form/${productId}`)
  }
  deleteProduct(productId: string){
    this.confirmationService.confirm({
      message: 'Do you want to delete this product?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.productService.deleteProduct(productId).subscribe(()=>{
          this._getProducts ();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is deleted successfuly' });
        },
        ()=>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product is not created successfuly ' });
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
}
