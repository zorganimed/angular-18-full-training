import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {LoginModel} from "../../model/login.model";
import {CommonModule} from "@angular/common";
import {MasterService} from "../../service/master.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, FormsModule,
    CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  _loginData : LoginModel={
    username : '',
    password :''
  }

  constructor(private masterService : MasterService,
              private router : Router) {
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  proceedLogin(loginForm: any) {
    if(loginForm.valid){
      this.masterService.proceedLogin(this._loginData).subscribe(item=>{
        let _resp = item;
        if(_resp.length>0){
          localStorage.setItem('username', this._loginData.username)
          this.router.navigateByUrl('');
        }else{
          alert('Invalid credentials')
        }
      })
    }
  }
}
