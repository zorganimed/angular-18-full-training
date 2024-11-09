import {Component, DoCheck} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-app-menu',
  standalone: true,
  imports: [RouterLink,MatToolbarModule, MatButtonModule, MatIconModule,
  CommonModule],
  templateUrl: './app-menu.component.html',
  styleUrl: './app-menu.component.css'
})
export class AppMenuComponent implements  DoCheck{

  showMenu = false;
  constructor(private router : Router) {
  }

  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if(currentUrl == '/login' || currentUrl =='/register'){
      this.showMenu=false;
    }else{
      this.showMenu=true;
    }
;  }
}
