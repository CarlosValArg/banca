import { Component, OnInit } from '@angular/core';
import { FastForexService } from '../services/fast-forex.service';
import { BuyCurrencyService } from '../services/buy-currency.service';
import { LocalStorageService } from 'ngx-webstorage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-foreign-exchange',
  templateUrl: './foreign-exchange.component.html',
  styleUrls: ['./foreign-exchange.component.scss']
})
export class ForeignExchangeComponent implements OnInit {

  currencies: any[] = [];
  accounts: any[] = [];
  fromCurrency: any;
  toCurrency: any;
  amountToBuy: number = 0;
  selectedAccount: any;
  transactionHistory: any[] = [];
  destinationAccount: any;

  constructor(
    private fastForexService: FastForexService,
    private buyCurrencyService: BuyCurrencyService,
    private storageService: LocalStorageService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.currencies = this.storageService.retrieve('currencies');
    
    const storedCustomer = this.storageService.retrieve('customer');
    if (storedCustomer && storedCustomer.accounts) {
      this.accounts = storedCustomer.accounts;
    }
    
    this.destinationAccount = this.accounts.find(account => account.accountName === 'Cuenta de Destino') || { balance: 0, currency: 'MXN' };
    
    this.transactionHistory = [];

    if (!this.currencies) {
      this.fastForexService.getCurrencies().subscribe((data: any) => {
        let fields = Object.entries(data.currencies);
        this.currencies = fields.map(([key, value]) => ({
          code: key,
          name: value
        }));
        this.storageService.store('currencies', this.currencies);
      });
    }
  }
  
  openBuyModal(content: any) {
    this.modalService.open(content);
  }

  buy() {
    if (this.amountToBuy <= 0 || !this.selectedAccount || !this.fromCurrency || !this.toCurrency) {
      alert("Por favor ingrese todos los datos correctamente.");
      return;
    }
  
    if (this.selectedAccount.balance < this.amountToBuy) {
      alert("Saldo insuficiente en la cuenta seleccionada.");
      return;
    }
  
    this.buyCurrencyService.buyCurrency(this.fromCurrency, this.toCurrency, this.amountToBuy, this.selectedAccount.accountName).subscribe((transaction: any) => {
      alert(`Compra realizada con éxito: ${transaction.amountToBuy} ${transaction.fromCurrency} convertidos a ${transaction.exchangedAmount} ${transaction.toCurrency}`);
      
      this.selectedAccount.balance -= this.amountToBuy;
      
      this.destinationAccount.balance += transaction.exchangedAmount;
      this.destinationAccount.currency = this.toCurrency;
  
      this.transactionHistory.push(transaction);
    });
  }  

  getDestinationAccountBalance(): number {
    return this.destinationAccount ? this.destinationAccount.balance : 0;
  }

  getDestinationAccountCurrency(): string {
    return this.destinationAccount ? this.destinationAccount.currency : 'MXN';
  }
}