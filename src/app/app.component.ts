import { Component } from '@angular/core';
import { CalculatorState } from './states/calculator.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CalculatorAction from './action/calculator.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentNumber$: Observable<string>;
  title = 'ngRx_Calculator';

  constructor(private store: Store<{ calculator: CalculatorState }>) {
    this.currentNumber$ = this.store.select(
      (state) => state.calculator.currentNumber);
  }
  
  enterNumber(number: string) {
    this.store.dispatch(CalculatorAction.enterNumber({ number: number }))
  }

  enterOperator(operator: string) {
    this.store.dispatch(CalculatorAction.enterOperator({ operator: operator }))
  }
}

