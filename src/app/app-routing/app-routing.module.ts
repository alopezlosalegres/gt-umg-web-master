import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './../authentication.guard';

import { LoginComponent } from './../components/login/login.component';
import { NavigationComponent } from './../components/navigation/navigation.component';
import { StatisticsComponent } from './../components/statistics/statistics.component';
import { ProductComponent } from '../components/product/product.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'dashboard',
    component: NavigationComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'statistics',
        component: StatisticsComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: '',
        redirectTo: 'statistics',
        pathMatch: 'full'
      },      
      {
        path: 'product',
        component: ProductComponent,
        canActivate: [AuthenticationGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }