import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInvest, ICustomer } from '../entities/interfaces';
import { TranscationType } from '../entities/enums';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  private investmentIdCounter = 1; // Variable para llevar la cuenta de las inversiones

  constructor(private storage: LocalStorageService) { }

  // Agregar inversión a un cliente
  public addInvestment(customer: ICustomer, amount: number, investRate: number): Observable<IInvest> {
    return new Observable(observer => {
      // Verificar si el monto de la inversión es mayor que 0
      if (amount <= 0) {
        observer.error('Amount must be greater than zero');
        return;
      }

      // Crear una nueva inversión con los parámetros recibidos
      const newInvestment: IInvest = {
        investmentId: `INV-${this.investmentIdCounter}`, // Usamos un ID fijo para la inversión
        balance: amount,  // Asignamos el balance de la inversión
        transactions: [  // Aquí creamos la transacción vinculada a la inversión
          {
            transactionId: `TX-${this.investmentIdCounter}`,  // Transacción vinculada
            accountId: `INV-${this.investmentIdCounter}`, // ID único para la cuenta de inversión
            amount: amount,  // El monto de la inversión
            transactionDate: new Date(),  // Fecha actual de la transacción
            transactionType: TranscationType.DEPOSIT  // Tipo de transacción: Depósito
          }
        ],
        investRate: investRate  // Asignamos el tasa de interés (investRate)
      };

      // Agregar la nueva inversión a las inversiones del cliente
      customer.investments.push(newInvestment);

      // Incrementamos el contador para el próximo ID
      this.investmentIdCounter++;

      // Guardar el cliente con la nueva inversión
      this.storage.store('customer', customer);

      // Emitir el nuevo objeto de inversión a los suscriptores
      observer.next(newInvestment);
      observer.complete();
    });
  }
}
