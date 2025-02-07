import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { MovementsComponent } from './movements/movements.component';
import { ForeignExchangeComponent } from './foreign-exchange/foreign-exchange.component';

import { InvestsComponent } from './invests/invests.component';
const routes: Routes = [
  { path: '', redirectTo: '/accounts-list', pathMatch: 'full' },
  { path: 'accounts-list', component: AccountsListComponent },
  { path: 'movements', component: MovementsComponent },
  { path: 'foreign-exchange', component: ForeignExchangeComponent },
  { path: 'invests', component: InvestsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
