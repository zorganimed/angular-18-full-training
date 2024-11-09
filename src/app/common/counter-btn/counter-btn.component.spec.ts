import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterBtnComponent } from './counter-btn.component';

describe('CounterBtnComponent', () => {
  let component: CounterBtnComponent;
  let fixture: ComponentFixture<CounterBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
