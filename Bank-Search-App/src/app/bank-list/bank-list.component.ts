import {Component, OnInit, ElementRef} from '@angular/core';
import {ChangeDetectionStrategy, Input,} from "@angular/core";

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { BankDetailsService } from '../bank-details.service';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class BankListComponent implements OnInit {
  @Input('data') meals: string[] = [];
  page: number = 1;



  headElements =  ['Add to Favourites', 'ID', 'Bank Name', 'State', 'District', 'City', 'Address', 'Branch', 'IFSC Code' ] ;
  details :any = [];
  sortDetails : any = [];
  // Angular Material Autocomplete //
  control = new FormControl();
  // banks: string[] = ["Allahabad Bank", "Andhra Bank", "Bank of Baroda", "Bank of India", "Bank of Maharashtra", "Canara Bank", "Central Bank of India", "Corporation Bank", "Indian Bank", "Indian Overseas Bank", "Oriental Bank of Commerce", "Punjab and Sind Bank", "Punjab National Bank", "State Bank of India", "Syndicate Bank", "UCO Bank", "Union Bank of India", "United Bank of India", "Axis Bank", "Bandhan Bank", "Catholic Syrian Bank", "City Union Bank", "DCB Bank", "Dhanlaxmi Bank", "Federal Bank", "HDFC Bank", "ICICI Bank", "IDFC First Bank", "IndusInd Bank", "Jammu & Kashmir Bank", "Karnataka Bank", "Karur Vysya Bank", "Kotak Mahindra Bank", "Lakshmi Vilas Bank", "Nainital Bank", "RBL Bank", "South Indian Bank", "Tamilnad Mercantile Bank Limited", "Yes Bank" ];
  filteredBanks: Observable<string[]>;
  isDisabled = true;
  favBanks : any = [];
  config  = {
    itemsPerPage: 5
  };
  //
  
  
  constructor( private bankDetails : BankDetailsService, private router : Router) {  }

  ngOnInit() {
  }
  
   getDetails(form) {
    
   
    document.getElementById('loader').setAttribute( "class", "spinner-grow text-primary" );

     this.details = [];
     this.bankDetails.getbankDetails(form).subscribe((data) => {
     this.details= data;
      
     document.getElementById("select").blur();
     document.getElementById("bankName").focus();
     document.getElementById('loader').removeAttribute("class");
     });
     
    } 
   searchInput(value){
      value = value.toUpperCase();
      this.sortDetails = [];
      this.details.filter((item) => {
        if ((item.bank_name).match(value) || ((item.bank_id).toString()).match(value) || (item.branch).match(value) || (item.ifsc).match(value) || (item.address).match(value) ){
        if (!((this.sortDetails).includes(item))){
          this.sortDetails.push(item);
        }
      }
      
      })
  
    } 

    addToFav(e){
      if (e.target.checked) {
        for (let i in this.sortDetails){
          if (e.target.id == this.sortDetails[i].ifsc){
            this.favBanks.push(this.sortDetails[i]);
          }
        }
      }
      else {
        if(this.favBanks.length == 1){
          this.favBanks.pop();
        }
        for(let i in this.favBanks){
          if(((this.favBanks[i].ifsc).indexOf(e.target.id)) >= 0){
            this.favBanks.splice(i, 1);
          }
        }
      }
      this.bankDetails.setFavBanks(this.favBanks);
      sessionStorage.setItem('fav', JSON.stringify(this.favBanks));

    }

    queryChange(e){
      this.config.itemsPerPage = e.target.value;
    }

    onClick(e){
      this.bankDetails.setBankDetails(e);
      this.router.navigate(['bank-details', e.bank_id]);

    }
}
