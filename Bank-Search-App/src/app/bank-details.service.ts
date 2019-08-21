import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BankDetailsService {
   city : any;
   bankName : any;
   bankDetails : any;
   favBanks : any = [];
   bankDetail : any;
  constructor( private http : HttpClient) { }

  getbankDetails(form){
    this.city = (form.value.city).toUpperCase();
    this.bankName = form.value.bankName;
   return this.http.get(`https://vast-shore-74260.herokuapp.com/banks?city=${this.city}`);
  }
  public setFavBanks(banks :any){
    this.favBanks = banks;
  }
  public getFavBanks(){
    return this.favBanks;
  }
  public setBankDetails(details : any){
    this.bankDetail = details;
  }
  public getBankDetails (){
    return this.bankDetail;
  }
}
