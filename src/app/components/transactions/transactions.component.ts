import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import * as moment from 'moment';
import { transaction } from 'src/app/models/transaction';
import {TransactionsService} from '../../services/transactions.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
formUdp!: FormGroup;
transactions: transaction[]=[];
transaction: any;
closeResult = '';

 

  constructor(public transactionsService:TransactionsService, private modalService: NgbModal,private fb: FormBuilder) { 
  }
  
  ngOnInit() {
    this.buildForm2();
    this.transactionsService.getTransactions()
    .subscribe(
      transactions => {console.log(transactions)
      this.transactions = transactions;
      }
      ,
      err => console.log(err)
    )
  }


  private buildForm2() {
   this.formUdp= this.fb.group({
      'VA_DESCRIPTION': new FormControl('', [Validators.required]),
      'VA_AMOUNT': new FormControl('', [Validators.required])
    });
  }

  BorrarTabla(id: any){
    parseInt(id);
    this.transactionsService.deleteTransaction(id)
    .subscribe(
     transactions => {console.log(transactions)
    }
    
    )
    location.reload();
  }

  open(content: any, transaction: any) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
     
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.transaction = transaction;
    this.formUdp.get('VA_DESCRIPTION')?.setValue(transaction.VA_DESCRIPTION);
    this.formUdp.get('VA_AMOUNT')?.setValue(transaction.VA_AMOUNT);
    
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      console.log('esc');
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      console.log('click afuera');
      return 'by clicking on a backdrop';
    } else {
      console.log('cualquier motivo');
      return `with: ${reason}`;
    }

    
  }
 
  update(){
    this.transaction.VA_DESCRIPTION = this.formUdp.value.VA_DESCRIPTION;
    this.transaction.VA_AMOUNT = this.formUdp.value.VA_AMOUNT;

    this.transactionsService.updateTransaction(this.transaction.NU_ID,{VA_DESCRIPTION: this.transaction.VA_DESCRIPTION,VA_AMOUNT:this.transaction.VA_AMOUNT,FE_CREATE_ON:moment().format()}) 
        .subscribe(
         transaction => {console.log(transaction)
         location.reload();
         }
         )
  }

}
