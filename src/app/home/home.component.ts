import {Component, ViewChild} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {ContactComponent} from "../common/contact/contact.component";
import {CommonModule} from "@angular/common";
import {ReversePipe} from "../custom/reverse.pipe";
import {FormsModule} from "@angular/forms";
import {ChildComponent} from "../common/child/child.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule,ContactComponent, CommonModule, ReversePipe, FormsModule,
  ChildComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  title = 'Angular 18';
  subTitle = 'Full course for beginners';
  date = new Date();
  salary = 1000;
  obj = {name:"mzo"};
  isDisabled = false;
  _class='inactive';
  _color = 'blue';
  _font = '34';
  isShow = false;
  ticketInfo=[
    {'id' : 1, 'name' : 'angular', color : 'green'},
    {'id' : 1, 'name' : 'react', color : 'blue'},
    {'id' : 1, 'name' : 'vueJs', color : 'red'}
  ]

  _view = 'home';

  firstname = '';
  lastname = '';

  @ViewChild(ChildComponent) _child! : ChildComponent;

  changeTitle(){
    this.title = "Angular 18 full tutorial.";
  }

  updateTitle(event : any){
    this.title = event.target.value;
  }

  updateTitle1(title: string) {
    this.title = title;
  }

  addFruit(fruit: any) {
    this._child.updateFruit(fruit);
  }
}
