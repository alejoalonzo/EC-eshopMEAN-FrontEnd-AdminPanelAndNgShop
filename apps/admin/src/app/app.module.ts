import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';

import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {SplitButtonModule} from 'primeng/splitbutton';
import {TableModule} from 'primeng/table';
import { CategoriesService } from '@bluebits/products';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';


const UX_MODULE = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  SplitButtonModule,
  TableModule,
]


const routes: Routes = [
  { path: '', component: ShellComponent, children:[
    {
      path: 'dashboard', component: DashboardComponent
    },
    {
      path: 'categories', component: CategoriesListComponent
    },
    {
      path: 'categories/form', component: CategoriesFormComponent
    }
  ] }
];

@NgModule({
  declarations: [AppComponent, DashboardComponent, ShellComponent, SidebarComponent, CategoriesListComponent, CategoriesFormComponent],
  imports: [
    BrowserModule, HttpClientModule, 
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    ...UX_MODULE
  ],
  providers: [CategoriesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
