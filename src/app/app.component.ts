import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionsService } from './services/transactions.service';
import {transaction} from './models/transaction';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Registro de Transacciones';

  form!: FormGroup;

  constructor(public transactionsService:TransactionsService) {
    this.buildForm();
  }

  ngOnInit() {
    
  }

  private buildForm() {
    this.form = new FormGroup({
      VA_DESCRIPTION: new FormControl('', [Validators.required]),
      VA_AMOUNT: new FormControl('', [Validators.required])
    });


    
  }
  save(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    console.log(value);
    this.transactionsService.newTransaction(value)
    .subscribe (news => console.log(news));
    location.reload();
  }
  

  
}
