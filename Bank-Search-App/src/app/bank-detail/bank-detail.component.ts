import { Component, OnInit } from '@angular/core';
import { BankDetailsService } from '../bank-details.service';

@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrls: ['./bank-detail.component.css']
})
export class BankDetailComponent implements OnInit {
  details = [];
  constructor(private bankDetails : BankDetailsService) { }

  ngOnInit() {
       this.details.push(this.bankDetails.getBankDetails());
  }

}
