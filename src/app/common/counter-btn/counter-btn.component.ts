import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MasterService} from "../../service/master.service";

@Component({
  selector: 'app-counter-btn',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './counter-btn.component.html',
  styleUrl: './counter-btn.component.css'
})
export class CounterBtnComponent {

  constructor(private masterService: MasterService) {
  }

  increment() {
    this.masterService.counterValue.update(previous => previous + 1);
  }

  decrement() {
    this.masterService.counterValue.update(previous => previous - 1);
  }

  reset() {
    this.masterService.counterValue.set(0);
  }

  addUser(name: string) {
    let id  = this.masterService.players().length+1;
    this.masterService.players.update(previous=>[...previous,{'id':id, 'name':name}])
  }
}
