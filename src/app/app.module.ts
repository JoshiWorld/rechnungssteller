import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersModule } from './dashboard/orders/orders.module';
import { OrderComponent } from './order/order.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { SecurityComponent } from './footer/security/security.component';
import { ImpressumComponent } from './footer/impressum/impressum.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    OrdersModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    OrderComponent,
    FooterComponent,
    SecurityComponent,
    ImpressumComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
