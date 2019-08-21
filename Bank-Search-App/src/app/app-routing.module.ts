import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavbanksComponent } from './favbanks/favbanks.component'; 
import { BankListComponent } from './bank-list/bank-list.component';
import { AppComponent } from './app.component';
import { ApiComponent } from './api/api.component';
import { BankDetailComponent } from './bank-detail/bank-detail.component';

const routes: Routes = [
  {path : '', redirectTo :  '/search-banks', pathMatch : 'full' },
  {path : 'search-banks', component : BankListComponent},
  {path : 'favourites', component : FavbanksComponent},
  {path : 'api', component : ApiComponent },
  {path : 'bank-details/:id', component :BankDetailComponent},
  {path : '**', component : AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routeConstants = [BankListComponent, FavbanksComponent, ApiComponent, AppComponent];