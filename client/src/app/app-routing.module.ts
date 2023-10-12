import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SavedDealsComponent } from './components/saved-deals/saved-deals.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { GuardService } from './services/guard.service';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'', pathMatch: 'full',component: HomeComponent},
  {path: 'deals', component: SearchResultComponent},
  {path: 'deals/:category', component: SearchResultComponent},
  {path: 'login', component: LoginComponent},
  {path: 'saved-deals', canActivate: [GuardService], component: SavedDealsComponent},
  {path: 'register', component: RegistrationComponent},
  {path: '**', redirectTo: '/', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
