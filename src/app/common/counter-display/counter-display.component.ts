import {Component, computed, effect, OnInit} from '@angular/core';
import {MasterService} from "../../service/master.service";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-counter-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-display.component.html',
  styleUrl: './counter-display.component.css'
})
export class CounterDisplayComponent {

  displayValue =0;
  totalPlayers = computed(()=>this.masterService.players().length);
  _totalPlayers$=toObservable(this.totalPlayers);
  _signalCount = toSignal(this._totalPlayers$);

  constructor(public masterService : MasterService) {
   effect(()=>{
      this.displayValue = this.masterService.counterValue();
    })
  }

}
