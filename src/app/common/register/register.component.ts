import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {Router, RouterLink} from "@angular/router";
import {Role, User} from "../../model/login.model";
import {MasterService} from "../../service/master.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatInputModule,
  MatButtonModule, MatCheckboxModule, MatRadioModule,
  MatSelectModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  registerForm! : FormGroup;

  roles: Role[] = [
    {value: 'salesman', viewValue: 'Sales Man'},
    {value: 'supervisor', viewValue: 'Supervisor'},
    {value: 'manager', viewValue: 'Manager'},
  ];

  constructor(private fb :  FormBuilder,
              private masterService : MasterService,
              private router : Router) {
  }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      username : this.fb.control({value: '', disabled : false}, Validators.required),
      name : this.fb.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
      password : this.fb.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
      email : this.fb.control('', Validators.compose([Validators.email,Validators.required])),
      role : this.fb.control('salesman', Validators.required),
      gender : this.fb.control('m', Validators.required),
      terms : this.fb.control(true, Validators.required)
    });

  }

  proceedRegister() {
    console.log(this.registerForm.value);
   // this.registerForm.setValue({username:'admin',name:'user'});
    if(this.registerForm.valid){
      if(this.registerForm.value.terms){
        let _data : User={
          id : this.registerForm.value.username as string,
          password : this.registerForm.value.password as string,
          email : this.registerForm.value.email as string,
          name : this.registerForm.value.name as string,
          role : this.registerForm.value.role as string,
          gender : this.registerForm.value.gender as string
        }

        this.masterService.proceedRegister(_data).subscribe(item=>{
          alert('Registered successfully!');
          this.router.navigateByUrl('/login');
        });
      }else{
        alert('Please agree terms & conditions and proceed');
      }
    }
  }
}
