import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule , routeConstants } from './app-routing.module';
import { AppComponent } from './app.component';
import { BankListComponent } from './bank-list/bank-list.component';
import { BankDetailsService } from './bank-details.service';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {NgxPaginationModule} from 'ngx-pagination';
import { FavbanksComponent } from './favbanks/favbanks.component'; 
import { ApiComponent } from './api/api.component';
import { BankDetailComponent } from './bank-detail/bank-detail.component';






@NgModule({
  declarations: [
    AppComponent,
    BankListComponent,
    FavbanksComponent,
    routeConstants,
    ApiComponent,
    BankDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgxPaginationModule
  
    
  ],
  schemas : [NO_ERRORS_SCHEMA],
  providers: [BankDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }


