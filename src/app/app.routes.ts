import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./common/about/about.component";
import {ContactComponent} from "./common/contact/contact.component";
import {CustomerComponent} from "./common/customer/customer.component";
import {AddComponent} from "./common/add/add.component";
import {StatusComponent} from "./common/status/status.component";
import {authGuard} from "./guard/auth.guard";
import {childauthGuard} from "./guard/childauth.guard";
import {authdGuard} from "./guard/authd.guard";
import {LoginComponent} from "./common/login/login.component";
import {RegisterComponent} from "./common/register/register.component";
import {ProductComponent} from "./common/product/product.component";
import {LearnComponent} from "./common/learn/learn.component";
import {NewProductComponent} from "./common/new-product/new-product.component";

export const routes: Routes = [
  {path : '', component : HomeComponent, canActivate : [authGuard]},
  {path : 'about', component : AboutComponent, canActivate : [authGuard]},
  {path : 'about/:id', component : AboutComponent, canActivate : [authGuard]},
  {path : 'login', component : LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'contact', loadComponent : ()=>import('./common/contact/contact.component').then(m=>m.ContactComponent), canActivate : [authGuard]},
  {path : 'customer', component : CustomerComponent,
  canActivate : [authGuard], canActivateChild : [childauthGuard],
  canDeactivate : [authdGuard],
  children : [
    {path : 'add', component : AddComponent},
    {path : 'edit/:id', component : AddComponent}
  ]},
  {path : 'product', component:ProductComponent, canActivate: [authGuard]},
  {path : 'learn', component : LearnComponent},
  {path : 'productnew', component : NewProductComponent},
  {path : '**', component : StatusComponent, canActivate : [authGuard]}
];
