import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ProductsSearchComponent } from './Components/products-search/products-search.component';
import { CategoriesBannerComponent } from './Components/categories-banner/categories-banner.component';
import { FeaturedProductsComponent } from './Components/featured-products/featured-products.component';
import { ProductItemComponent } from './Components/product-item/product-item.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProductsListComponent } from './Components/pages/products-list/products-list.component';
import { FormsModule } from '@angular/forms';
import { ProductPageComponent } from './Components/pages/product-page/product-page.component';
import { UiModule } from '@bluebits/ui';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

export const productsRoutes: Route[] = [
  { path: 'products', component: ProductsListComponent },
  { path: 'category/:categoryid', component: ProductsListComponent },
  { path: 'products/:productid', component: ProductPageComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productsRoutes),
    ButtonModule,
    CheckboxModule,
    FormsModule,
    RatingModule,
    InputNumberModule,
    UiModule,
    ToastModule,
  ],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductsListComponent,
    ProductPageComponent,
  ],

  exports: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductsListComponent,
  ],
  providers: [MessageService],
})
export class ProductsModule {}
