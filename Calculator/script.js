
const resultDisplay = document.getElementById("result");
const expressionDisplay = document.getElementById("expression");
const buttons = document.querySelector(".buttons");

let currentNumber = "0";
let firstNumber = null;
let operator = null;

let calculationFinished = false;

buttons.addEventListener("click", function (event) {
  const number = event.target.dataset.number;
  const action = event.target.dataset.action;
  let symbol = "";

  if (number !== undefined) {
    if (calculationFinished) {
      currentNumber = number;
      calculationFinished = false;
    } else if (currentNumber === "0") {
      currentNumber = number;
    } else {
      currentNumber += number;
    }

    resultDisplay.textContent = currentNumber;
  }

  if (action === "decimal") {
    if (calculationFinished) {
      currentNumber = "0.";
      calculationFinished = false;
    } else if (!currentNumber.includes(".")) {
      currentNumber += ".";
    }

    resultDisplay.textContent = currentNumber;
    }
  

  if (
    action === "add" ||
    action === "subtract" ||
    action === "multiply" ||
    action === "divide"
  ) {
    firstNumber = Number(currentNumber);
    operator = action;
    calculationFinished = false;

    if (action === "add") {
      symbol = "+";
    } else if (action === "subtract") {
      symbol = "−";
    } else if (action === "multiply") {
      symbol = "×";
    } else if (action === "divide") {
      symbol = "÷";
    }

    expressionDisplay.textContent = firstNumber + " " + symbol;
    currentNumber = "0";
  }

  if (action === "calculate") {
    if (firstNumber === null || operator === null) {
      return;
    }
    const secondNumber = Number(currentNumber);
    let answer;

    if (operator === "add") {
      answer = firstNumber + secondNumber;
    } else if (operator === "subtract") {
      answer = firstNumber - secondNumber;
    } else if (operator === "multiply") {
      answer = firstNumber * secondNumber;
    } else if (operator === "divide") {
      if (secondNumber === 0) {
        answer = "Error";
      } else {
        answer = firstNumber / secondNumber;
      }
    }

    let operatorSymbol = operator;

    if (operator === "add") {
      operatorSymbol = "+";
    } else if (operator === "subtract") {
      operatorSymbol = "−";
    } else if (operator === "multiply") {
      operatorSymbol = "×";
    } else if (operator === "divide") {
      operatorSymbol = "÷";
    }

    expressionDisplay.textContent =
      firstNumber + " " + operatorSymbol + " " + secondNumber + " =";

    currentNumber = String(answer);
    resultDisplay.textContent = currentNumber;
    calculationFinished = true;
  }

  if (action === "clear") {
    currentNumber = "0";
    firstNumber = null;
    operator = null;
    calculationFinished = false;

    resultDisplay.textContent = "0";
    expressionDisplay.textContent = "";
  }
});
