import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountComponent } from './account/account.component';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { InvalidStrategyError, NgxWebstorageModule } from 'ngx-webstorage';
import { PipesModule } from './pipes/pipes.module';
import { UiModule } from './ui/ui.module';
import { FormsModule } from '@angular/forms';
import { MovementsComponent } from './movements/movements.component';
import { ForeignExchangeComponent } from './foreign-exchange/foreign-exchange.component';
import { HttpClientModule } from '@angular/common/http';
import { InvestsComponent } from './invests/invests.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    AccountsListComponent,
    MovementsComponent,
    ForeignExchangeComponent,
    InvestsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    PipesModule,
    UiModule,
    FormsModule,
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
    NgbModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
