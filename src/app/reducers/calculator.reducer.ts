import { createReducer, on, resultMemoize } from "@ngrx/store";
import { CalculatorState } from "../states/calculator.state";
import * as CalculatorAcion from "../action/calculator.action"

const initialState: CalculatorState = {
    currentNumber: '0',
    previousNumber: '0',
    operator: '',
}

export const calculatorReducer = createReducer(
    initialState,
    on(CalculatorAcion.enterNumber, (state, action) => {
        let newState = { ...state }
        if (action.number == '.') {
            if (!state.currentNumber.includes('.')) {
                newState.currentNumber = state.currentNumber + '.';
            }
            return newState;
        }
        if (state.currentNumber =='0') {
            newState.currentNumber = action.number;
        }
        else {
            newState.currentNumber = state.currentNumber + action.number;
 
        }
        return newState;

    }),

on(CalculatorAcion.enterOperator, (state, action) => {
    if (action.operator == '+/-') {
        return {
            ...state,
            currentNumber: (parseFloat(state.currentNumber) * -1).toString()
        }
    }
    if (action.operator == '%') {
        return {
            ...state,
            currentNumber: (parseFloat(state.currentNumber) / 100).toString()
        }
    }
    if (action.operator == 'C') {
        return {
            ...state,
            currentNumber: '0',
            previousNumber: '0',
            operator: '',
        }
    }
    if (action.operator == 'DEL') {
        return {
            ...state,
            currentNumber: state.currentNumber.slice(
                0, state.currentNumber.length - 1
            )
        }
    }

    if (action.operator == '=') {
        let res = 0
        if (state.operator == '+') {
            res = parseFloat(state.previousNumber) + parseFloat(state.currentNumber)
        }
        else if (state.operator == '-') {
            res = parseFloat(state.previousNumber) - parseFloat(state.currentNumber)
        }
        else if (state.operator == '*') {
            res = parseFloat(state.previousNumber) * parseFloat(state.currentNumber)
        }
        else if (state.operator == '/') {
            res = parseFloat(state.previousNumber) / parseFloat(state.currentNumber)
        }
        return{
            ...state,
            currentNumber: res.toString(),
        }
    }
    else {
        return{
            ...state,
            previousNumber: state.currentNumber,
            currentNumber: '0',
            operator: action.operator,
        }
    }
})
);