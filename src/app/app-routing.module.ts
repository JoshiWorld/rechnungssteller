import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { OrderComponent } from './order/order.component';
import { ImpressumComponent } from './footer/impressum/impressum.component';
import { SecurityComponent } from './footer/security/security.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'datenschutz', component: SecurityComponent },
  { path: 'order', component: OrderComponent },
  { path: 'order/:id', component: OrderComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
