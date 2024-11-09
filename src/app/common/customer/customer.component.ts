import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, RouterLink, FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

  userinput = '';
  isLoading = false;
  count = 1;

  canNavigate(){
    if(this.userinput !== ''){
      if(confirm('if you navigate your data going to lost, do you want to continue ?')){
        return true;
      }else{
        return false;
      }
    }else{
      return true;
    }
  }

  load() {
    this.isLoading = true;
    this.count++;
  }
}
