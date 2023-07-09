import { ChangeEvent } from "react"
import { deleteArrowIconDark, deleteArrowIconLight } from "../svg"

interface KeyboardProps {
  isDarkTheme: boolean,
  answer: string,
  setAnswer: (arg0: (prev: string) => string) => void,
  setCurrentEquation: (arg0: (prev: string) => string) => void,
}

const Keyboard = ({ isDarkTheme, setCurrentEquation, answer, setAnswer}: KeyboardProps) => {

  const getCurrentEquationInArray = (numbers: string[], symbols: string[]): string[] => {
    let currentEquationArray = [];
    if (numbers.length > symbols.length) {

      for (let i = 0 ; i < symbols.length; i++) {
        currentEquationArray.push(numbers[i]);
        currentEquationArray.push(symbols[i]);
      }

      currentEquationArray.push(numbers[numbers.length - 1]);
    } else {
      
      for (let i = 0 ; i < symbols.length - 1; i++) {
        currentEquationArray.push(numbers[i]);
        currentEquationArray.push(symbols[i]);
      }

      currentEquationArray.push(numbers[numbers.length - 1]);
    }
    return currentEquationArray;
  }

  const findAllNumbers = (str: string): string[] | null  => {
    const re: RegExp = /\w+(\.\w+)?/g;
    return str.match(re);
  }

  const findAllSymbols = (str: string): string[] | null => {
    const re: RegExp = /[\+\-\×\÷]+/g;
    return str.match(re);
  }

  const calculator = (str: string): string => {
    const allNumber = findAllNumbers(str);
    const allSymbols = findAllSymbols(str);
    if (allNumber && allSymbols) {
      const equation = getCurrentEquationInArray(allNumber, allSymbols);
      const resultOfHighPriorityOperations = highPrioritySymbolsOperation(equation);
      const result = lowPrioritySymbolsOperation(resultOfHighPriorityOperations);
      return result;
    } else if (allNumber) {
      return allNumber[0];
    }

    return "";
  }

  const highPrioritySymbolsOperation = (equation: string[]): string[] => {
    let newEquation: string[] = equation;
    while (newEquation.includes("÷") || newEquation.includes("×")) {
      const indexDivision: number = newEquation.indexOf("÷");
      const indexMultiplication: number = newEquation.indexOf("×");
      if (indexDivision > indexMultiplication) {
        newEquation = getTheResultOfTheDivision(newEquation, indexDivision);
      } else if (indexDivision < indexMultiplication) {
        newEquation = getTheResultOfTheMultiplication(newEquation, indexMultiplication);
      } else {
        return newEquation
      }
    }
    return newEquation;
  }

  const lowPrioritySymbolsOperation = (equation: string[]): string => {
    let newEquation: string[] = equation;
    while (newEquation.includes("+") || newEquation.includes("-")) {
      const indexAddition = newEquation.indexOf("+");
      const indexSubtraction = newEquation.indexOf("-");
      if (indexAddition > indexSubtraction) {
        newEquation = getTheResultOfAddition(newEquation, indexAddition);
      } else if (indexAddition < indexSubtraction) {
        newEquation = getSubtractionResult(newEquation, indexSubtraction);
      }
    }
    return newEquation[0];
  }

  const getTheResultOfTheDivision = (equation: string[], indexDivision: number): string[] => {
    return getTheResultOfTheOperation(equation, indexDivision, "/");
  }

  const getTheResultOfTheMultiplication = (equation: string[], indexMultiplication: number): string[] => {
    return getTheResultOfTheOperation(equation, indexMultiplication, "*");
  }

  const getTheResultOfAddition = (equation: string[], indexAddition: number): string[] => {
    return getTheResultOfTheOperation(equation, indexAddition, "+");
  }

  const getSubtractionResult = (equation: string[], indexSubtraction: number): string[] => {
    return getTheResultOfTheOperation(equation, indexSubtraction, "-");
  }

  const getTheResultOfTheOperation = (equation: string[], indexSymbol: number, symbol: string): string[] => {
    const firstNumber = Number(equation[indexSymbol - 1]);
    const secondNumber = Number(equation[indexSymbol + 1]);
    let result 
    switch (symbol) {
      case "+": 
        result = firstNumber + secondNumber;
        break;
      case "-": 
        result = firstNumber - secondNumber;
        break;
      case "*": 
        result = firstNumber * secondNumber;
        break;
      case "/": 
        result = firstNumber / (secondNumber || 1); // zero check
        break;
      default: 
        result = 0;
        break;
    }
    
    return [...equation.slice(0, indexSymbol - 1), result.toString(), ...equation.slice(indexSymbol + 2)];
  }

  const clickHandler = (event: ChangeEvent<EventTarget | HTMLLIElement>) => {
    const target = event.currentTarget as HTMLElement
    const pressedSymbol: string = target.innerText

    if (answer) {
      setAnswer(() => "");
      setCurrentEquation(() => "");
    }

    setCurrentEquation((prev): string => {
      const previousSimbol: string = prev[prev.length - 1];

      if (pressedSymbol === "AC") {
        setAnswer( () => "");
        return "0";
      } else if (pressedSymbol === '') {      // pressed a delete button (arrow)
        return prev.slice(0, -1);
      } else if (pressedSymbol === '%') {
        const numbers: string[] | null = findAllNumbers(prev);
        if (numbers) {
          const lastNumber: string = numbers[numbers.length - 1];
          return prev.slice(0, prev.indexOf(lastNumber)) + `${Number(lastNumber) * 0.01}`;
        } else {
          return prev;
        }
      } else if (pressedSymbol === '=') {
        if (!prev) {
          return "0"
        }
        setAnswer( (): string => {
          return "= " + calculator(prev);
        });
        return prev;
      } else if ((prev === "0" || prev === "00") && pressedSymbol === ".") {
        return "0" + pressedSymbol;
      } else if (isCorrectInputSequence(previousSimbol, pressedSymbol)) {
        if (!prev && (pressedSymbol === "÷" || pressedSymbol === "×" || pressedSymbol === "+")) {
          return "0"
        } else if ((prev === "0" || prev === "00") && (pressedSymbol === "÷" || pressedSymbol === "×" || pressedSymbol === "+")) {
          return prev;
        } else if (prev === "0" || prev === "00") {
          return pressedSymbol
        }
        return prev + pressedSymbol;
      } else {
        return prev.slice(0, -1) + pressedSymbol;
      }
    })
  }

  const isCorrectInputSequence = (previousSimbol: string, currentSimbol: string): boolean => {
    return !isNaN(Number(currentSimbol)) || !isNaN(Number(previousSimbol));
  }

  return (
    <ul className={`keyboard ${isDarkTheme ? "keyboard--dark" : "keyboard--light"}`}>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__main-item--dark" : "keyboard__main-item--light"}`} onClick={clickHandler}>AC</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__main-item--dark" : "keyboard__main-item--light"}`} onClick={clickHandler}>{isDarkTheme ? deleteArrowIconDark : deleteArrowIconLight}</li>
      <li className={`keyboard__item keyboard__math__signs ${isDarkTheme ? "keyboard__math__signs--dark" : "keyboard__math__signs--light"}`} onClick={clickHandler}>%</li>
      <li className={`keyboard__item keyboard__math__signs ${isDarkTheme ? "keyboard__math__signs--dark" : "keyboard__math__signs--light"}`} onClick={clickHandler}>÷</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`} onClick={clickHandler}>7</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`} onClick={clickHandler}>8</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`} onClick={clickHandler}>9</li>
      <li className={`keyboard__item keyboard__math__signs ${isDarkTheme ? "keyboard__math__signs--dark" : "keyboard__math__signs--light"}`} onClick={clickHandler}>×</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`} onClick={clickHandler}>4</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`} onClick={clickHandler}>5</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`} onClick={clickHandler}>6</li>
      <li className={`keyboard__item keyboard__math__signs ${isDarkTheme ? "keyboard__math__signs--dark" : "keyboard__math__signs--light"}`} onClick={clickHandler}>-</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`} onClick={clickHandler}>1</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`} onClick={clickHandler}>2</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`} onClick={clickHandler}>3</li>
      <li className={`keyboard__item keyboard__math__signs ${isDarkTheme ? "keyboard__math__signs--dark" : "keyboard__math__signs--light"}`} onClick={clickHandler}>+</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`} onClick={clickHandler}>00</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`} onClick={clickHandler}>0</li>
      <li className={`keyboard__item ${isDarkTheme ? "keyboard__item--dark" : "keyboard__item--light"}`} onClick={clickHandler}>.</li>
      <li className={`keyboard__item keyboard__math__signs ${isDarkTheme ? "keyboard__math__signs--dark" : "keyboard__math__signs--light"}`} onClick={clickHandler}>=</li>
    </ul>
  )
}

export default Keyboard