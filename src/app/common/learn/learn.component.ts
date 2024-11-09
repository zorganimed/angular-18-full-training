import {Component, OnInit} from '@angular/core';
import {
  AsyncSubject,
  BehaviorSubject,
  concat,
  delay,
  every,
  filter,
  find,
  first,
  last,
  map,
  merge,
  Observable,
  of, ReplaySubject,
  Subject,
  take
} from "rxjs";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.css'
})
export class LearnComponent implements OnInit{

  ticketInfo=[
    {'id' : 1, 'name' : 'angular', color : 'green'},
    {'id' : 1, 'name' : 'react', color : 'blue'},
    {'id' : 1, 'name' : 'vueJs', color : 'red'}
  ]

  ticketInfo$=of(this.ticketInfo);

  data$ = of(1,2,3);
  data1$ = of(4,5,6).pipe(delay(10000));
  data2$ = of(7,8,9);

  subject$ = new Subject()
  behaviorSubject$=new BehaviorSubject(1);
  replaySubject$ = new ReplaySubject();
  asyncSubject$=new AsyncSubject();

  observable = new Observable((subscriber)=>{

    subscriber.next('Order placed')
    setTimeout(()=>{
      subscriber.next('Order approved')
    },2000)
    setTimeout(()=>{
      subscriber.next('packed')
    },4000)
    setTimeout(()=>{
      subscriber.next('Shiped')
    },6000)

    //subscriber.complete();

  });

  ngOnInit(): void {

   /* this.observable.subscribe({
      next(x){
        console.log('we got value is '+x)
      },
      error(err){
        console.log('we got value is '+err)
      },
      complete(){
        console.log('completed')
      }
    })*/

    /*this.ticketInfo$.subscribe(item=>{
      console.log(item);
    })*/

    /*this.data.pipe(map((x)=>x*2)).subscribe(item=>{
      console.log(item)
    });*/

    /*this.data$.pipe(filter((x)=>x>2)).subscribe(item=>{
      console.log(item)
    });*/

    /*merge(this.data$,this.data1$,this.data2$).subscribe(item=>{
      console.log(item)
    });*/

    /*concat(this.data$,this.data1$,this.data2$).pipe(every((x)=>x>=1)).subscribe(item=>{
      console.log(item)
    });*/

    /*this.subject$.subscribe(item=>{
      console.log('Observer 1 : '+item)
    })
    this.subject$.next(1);
    this.subject$.next(2);

    this.subject$.subscribe(item=>{
      console.log('Observer 2 : '+item)
    })
    this.subject$.next(3)*/

    /*this.behaviorSubject$.subscribe(item=>{
      console.log('Observer 1 : '+item)
    })
    this.behaviorSubject$.next(1);
    this.behaviorSubject$.next(2);

    this.behaviorSubject$.subscribe(item=>{
      console.log('Observer 2 : '+item)
    })
    this.behaviorSubject$.next(3)*/

    /*this.replaySubject$.subscribe(item=>{
      console.log('Observer 1 : '+item)
    })
    this.replaySubject$.next(1);
    this.replaySubject$.next(2);

    this.replaySubject$.subscribe(item=>{
      console.log('Observer 2 : '+item)
    })
    this.replaySubject$.next(3)*/

    this.asyncSubject$.subscribe(item=>{
      console.log('Observer 1 : '+item)
    })
    this.asyncSubject$.next(1);
    this.replaySubject$.next(2);

    this.asyncSubject$.subscribe(item=>{
      console.log('Observer 2 : '+item)
    })
    this.asyncSubject$.next(3);
    this.asyncSubject$.complete()

  }


}
