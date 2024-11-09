import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CounterBtnComponent} from "../counter-btn/counter-btn.component";
import {CounterDisplayComponent} from "../counter-display/counter-display.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CounterBtnComponent, CounterDisplayComponent,
  CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit{

  routeValue : any;
  countries = ['Tunisia','Algeria','Palestine']
  constructor(private route : ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routeValue = this.route.snapshot.paramMap.get('id');
    console.log(this.routeValue);
  }


}
