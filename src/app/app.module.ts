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
import { FormsModule } from '@angular/forms';
import { CustomerSaveComponent } from './components/customer-save/customer-save.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductSaveComponent } from './components/product-save/product-save.component';
import { PaymentMethodEditComponent } from './components/payment-method-edit/payment-method-edit.component';
import { PaymentMethodSaveComponent } from './components/payment-method-save/payment-method-save.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    NavbarComponent,
    ProductListComponent,
    PaymentMethodListComponent,
    CustomerSaveComponent,
    CustomerEditComponent,
    ProductEditComponent,
    ProductSaveComponent,
    PaymentMethodEditComponent,
    PaymentMethodSaveComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    NgFallimgModule.forRoot({
      default: 'assets/img/noimage.png'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
