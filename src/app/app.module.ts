import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';


import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { ProductListComponent } from './components/product-list/product-list.component';
import { PaymentMethodListComponent } from './components/payment-method-list/payment-method-list.component';

import { NgFallimgModule } from 'ng-fallimg';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    NavbarComponent,
    ProductListComponent,
    PaymentMethodListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    NgFallimgModule.forRoot({
      default:'assets/img/noimage.png'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
