import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@bluebits/products';
import { MessageService, ConfirmationService, ConfirmEventType  } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'bluebits-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit, OnDestroy {

  categories: Category[] =[]; 
  //End Subscription for performance, used in onDestry
  endsubs$: Subject<any> = new Subject();

  constructor(
    private categoriesService: CategoriesService, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit(): void {
    this._getCategories ()
  }
  ngOnDestroy(){
    this.endsubs$.complete();
  }
  deleteCategory(categoryId: string){
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.categoriesService.deleteCategories(categoryId).subscribe(()=>{
          this._getCategories ();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is deleted successfuly' });
        },
        ()=>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not created successfuly ' });
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

  editCategory(categoryId: string){
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }
  private _getCategories (){
    this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe((cats)=>{
      this.categories = cats;
    })
  }


}
