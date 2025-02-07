import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICustomer, IAccount, IInvest } from '../entities/interfaces';
import { LocalStorageService } from 'ngx-webstorage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvestmentService } from '../services/investment.service';

@Component({
  selector: 'app-invests',
  templateUrl: './invests.component.html',
  styleUrls: ['./invests.component.scss']
})
export class InvestsComponent implements OnInit {
  customer: ICustomer = this.storage.retrieve('customer');
  accounts: IAccount[] = [];
  selectedAccount?: IAccount;
  investmentAmount: number = 0;
  investmentRate: number = 0;
  investmentHistory: { amount: number, profit: number, timestamp: Date }[] = [];

  constructor(
    private storage: LocalStorageService,
    private modalService: NgbModal,
    private investmentService: InvestmentService
  ) { }

  ngOnInit(): void {
    this.accounts = this.customer.accounts;
    this.customer.investments = this.customer.investments || []; // Inicialización segura
    this.startInvestmentUpdates();
  }

  openInvestmentModal(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'lg' });
  }

  submitInvestment(amount: number, investRate: number) {
    if (!this.selectedAccount) {
      console.log('No account selected');
      return;
    }

    if (this.selectedAccount.balance < amount) {
      alert('El monto de inversión no puede ser mayor al balance de la cuenta.');
      return;
    }

    this.selectedAccount.balance -= amount;

    const investment: IInvest = {
      investmentId: new Date().getTime().toString(),
      balance: amount,
      transactions: [],
      investRate: investRate
    };

    this.customer.investments.push(investment);
    this.storage.store('customer', this.customer);
    this.modalService.dismissAll();
    alert(`Inversión de $${amount} realizada con éxito.`);
  }

  startInvestmentUpdates() {
    setInterval(() => {
      if (!this.customer.investments) return;
      this.customer.investments.forEach(investment => {
        const profit = investment.balance * investment.investRate / 100;
        investment.balance += profit;

        this.investmentHistory.push({
          amount: investment.balance,
          profit: profit,
          timestamp: new Date()
        });
      });
      this.storage.store('customer', this.customer);
    }, 10000); 
  }
}
