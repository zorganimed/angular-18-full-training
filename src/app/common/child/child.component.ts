import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {

  @Input() firstname : any;
  @Input() lastname : any;
  @Input() nameObj : any;

  @Output()  dataUpdater = new EventEmitter<string>();

  fruits = ['Apple', 'Orange'];

  updateFruit(fruitname :string){
    this.fruits.push(fruitname);
    return 'data added';
  }

}
