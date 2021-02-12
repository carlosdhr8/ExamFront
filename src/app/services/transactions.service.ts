import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {


  constructor(private http : HttpClient) { }

  getTransactions(){
   return this.http.get<transaction[]>('http://localhost:3000/listar');
  }

 // getOneTransaction(idbus: number){
 // return this.http.get<transaction>('http://localhost:3000/buscar/'+idbus);
// }

   deleteTransaction(iddel: number){
    return this.http.delete('http://localhost:3000/borrar/'+iddel);
   }

   newTransaction( ntrans: transaction){
    return this.http.post<transaction>('http://localhost:3000/crear',ntrans);
   }

   updateTransaction (id : number, ntrans : transaction) {
    return this.http.put<transaction>('http://localhost:3000/buscar/'+id,ntrans);
   }
}
