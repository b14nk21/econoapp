import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// PAGES 
import { FacturacionComponent } from './pages/facturacion/facturacion.component';
import { PointSaleComponent } from './pages/point-sale/point-sale.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';

// Guards
import { authGuard } from './utils/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'signIn', component: SignInComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
  {path: 'facturacion/:id', component: FacturacionComponent},
  {path: 'facturacion', component: FacturacionComponent},
  {path: 'pointSale/:id', component: PointSaleComponent},
  {path: 'pointSale', component: PointSaleComponent},
  {path: 'empresas', component: EmpresasComponent},
  {path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
