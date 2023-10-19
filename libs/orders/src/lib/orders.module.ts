import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, Routes } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { MessagesModule } from 'primeng/messages';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { AuthGardService } from '@bluebits/users';

const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'checkout',
    canActivate: [AuthGardService],
    component: CheckoutPageComponent,

  },
  {
    path: 'success',
    component: ThankYouComponent,
  },
  
];

export const ordersRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BadgeModule,
    MessagesModule,
    ButtonModule,
    InputNumberModule,
    RouterModule.forChild(routes),
    FormsModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextareaModule,
    ReactiveFormsModule,
    DropdownModule,
  ],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent,
  ],
  providers: [MessagesModule],
  exports: [CartIconComponent, CartPageComponent],
})
export class OrdersModule {
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }
}
