import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@bluebits/ui';
import { OrdersModule } from '@bluebits/orders';
import { ProductsModule } from '@bluebits/products';
import { AccordionModule } from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import { UsersModule } from '@bluebits/users';
import { StoreModule,  } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@bluebits/users';
import { NgxStripeModule } from 'ngx-stripe';
import { stripeApiKeyFront } from '@env/apikey';


const routes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ProductsModule,
    UiModule,
    AccordionModule,
    OrdersModule,
    UsersModule,
    NgxStripeModule.forRoot(stripeApiKeyFront.apiKeyStripepublic)
  ],
  providers: [MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true }//Token to authorize (Bearer)
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
