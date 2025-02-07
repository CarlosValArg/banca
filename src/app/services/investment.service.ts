import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInvest, ICustomer } from '../entities/interfaces';
import { TranscationType } from '../entities/enums';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  private investmentIdCounter = 1;

  constructor(private storage: LocalStorageService) { }

  public addInvestment(customer: ICustomer, amount: number, investRate: number): Observable<IInvest> {
    return new Observable(observer => {
      if (amount <= 0) {
        observer.error('Amount must be greater than zero');
        return;
      }

      const newInvestment: IInvest = {
        investmentId: `INV-${this.investmentIdCounter}`, 
        balance: amount,  
        transactions: [  
          {
            transactionId: `TX-${this.investmentIdCounter}`,  
            accountId: `INV-${this.investmentIdCounter}`, 
            amount: amount, 
            transactionDate: new Date(),  
            transactionType: TranscationType.DEPOSIT
          }
        ],
        investRate: investRate
      };

      customer.investments.push(newInvestment);

      this.investmentIdCounter++;

      this.storage.store('customer', customer);

      observer.next(newInvestment);
      observer.complete();
    });
  }
}