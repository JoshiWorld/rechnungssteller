import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from './orders.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    OrdersComponent
  ],
  exports: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    NgbModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class OrdersModule { }
