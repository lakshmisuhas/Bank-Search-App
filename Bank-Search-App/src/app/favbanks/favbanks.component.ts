import { Component, OnInit } from '@angular/core';
import { BankDetailsService } from '../bank-details.service';


@Component({
  selector: 'app-favbanks',
  templateUrl: './favbanks.component.html',
  styleUrls: ['./favbanks.component.css']
})
export class FavbanksComponent implements OnInit {
  favBanks : any;
  headElements =  ['ID', 'Bank Name', 'State', 'District', 'City', 'Address', 'Branch', 'IFSC Code' ] ;
 
  constructor(private bankDetails : BankDetailsService) { }

  ngOnInit() {
    this.favBanks=    JSON.parse(sessionStorage.getItem('fav'));
  }
  
}
