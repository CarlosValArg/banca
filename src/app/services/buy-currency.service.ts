import { Injectable } from '@angular/core';
import { FastForexService } from './fast-forex.service';
import { Observable, of } from 'rxjs';

interface Transaction {
  fromCurrency: string;
  toCurrency: string;
  amountToBuy: number;
  exchangedAmount: number;
  date: string;
  account: string;
}

@Injectable({
  providedIn: 'root'
})
export class BuyCurrencyService {

  private transactions: Transaction[] = [];

  constructor(
    private fastForexService: FastForexService
  ) { }

  buyCurrency(fromCurrency: string, toCurrency: string, amountToBuy: number, account: string): Observable<Transaction> {
    return new Observable(observer => {
      this.fastForexService.getExchangeRate(fromCurrency, toCurrency).subscribe((data: any) => {
        const exchangeRate = data.result[toCurrency];
        const exchangedAmount = amountToBuy * exchangeRate;
  
        const transaction: Transaction = {
          fromCurrency,
          toCurrency,
          amountToBuy,
          exchangedAmount,
          date: new Date().toLocaleString(),
          account
        };
  
        this.transactions.push(transaction);
        this.saveTransactions();
  
        console.log('Transacción realizada:', transaction);

        observer.next(transaction);
        observer.complete();
      }, (error) => {
        console.error('Error al obtener la tasa de cambio:', error);
        observer.error(error); 
      });
    });
  }

  getTransactions(): Transaction[] {
    return this.loadTransactions();
  }

  private loadTransactions(): Transaction[] {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    return storedTransactions;
  }

  private saveTransactions(): void {
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }

  updateDestinationAccount(accounts: any[], toCurrency: string, exchangedAmount: number): void {
    const destinoAccount = accounts.find(account => account.accountName === 'Cuenta de Destino');
    if (destinoAccount) {
      destinoAccount.balance += exchangedAmount; 
      destinoAccount.currency = toCurrency; 
    }
  }
}