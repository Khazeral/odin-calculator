import { add, substract, divide, multiply } from "./calculate.js";
import { checkOperationIsOk, isOperatorPreviousTerm } from "./utils.js";

const displayScreen = document.getElementById("operation-display");
const buttons = document.querySelectorAll("button");
let operationLine = "0";
const MYSTERIOUS_NUMBER = "35383773"

const writeOperationOnScreen = (value) => {
  if (operationLine === "0" && value !== ".") {
    operationLine = value;
  } else {
    operationLine += value;
  }
  displayScreen.textContent = operationLine;
};

const eraseOperation = () => {
  operationLine = "0";
  displayScreen.textContent = operationLine;
};

const removeLastCharacter = () => {
  operationLine = operationLine.slice(0, -1) || "0";
  displayScreen.textContent = operationLine;
};

const operate = () => {
  const terms = operationLine.split(/([+\-*/])/);

  if (checkOperationIsOk(terms)) {
    let tempArray = [];
    let i = 0;
    while (i < terms.length) {
      if (terms[i] === "*" || terms[i] === "/") {
        const prev = parseFloat(tempArray.pop());
        const next = parseFloat(terms[i + 1]);
        let result;

        if (terms[i] === "*") {
          result = multiply(prev, next);
        } else if (terms[i] === "/") {
            if (next === 0) {
                return "Erreur";
            }
            result = divide(prev, next);
        }
        tempArray.push(result.toString());
        i += 2;
      } else {
        tempArray.push(terms[i]);
        i++;
      }
    }

    let result = parseFloat(tempArray[0]);
    for (let i = 1; i < tempArray.length; i += 2) {
      const operator = tempArray[i];
      const next = parseFloat(tempArray[i + 1]);

      if (operator === "+") {
        result = add(result, next);
      } else if (operator === "-") {
        result = substract(result, next);
      }
    }
    return result;
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", () => processInputUser(button.value));
});

const processInputUser = (value) => {
  switch (value) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      writeOperationOnScreen(value);
      break;

    case ".":
      const lastTerm = operationLine.split(/[+\-*/]/).pop();
      if (!lastTerm.includes(".")) {
        writeOperationOnScreen(value);
      }
      break;

    case "*":
    case "/":
    case "+":
    case "-":
      if (!isOperatorPreviousTerm(operationLine)) {
        writeOperationOnScreen(value);
      }
      break;

    case "=":
      const result = operate();
      operationLine = result.toString();
      if(operationLine === MYSTERIOUS_NUMBER) alert('Petit coquin va')
      displayScreen.textContent = result;
      break;

    case "del":
      if(operationLine === "Erreur") eraseOperation()
      removeLastCharacter();
      break;

    case 'AC':
      eraseOperation();
      break;
  }

};

document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") {
    writeOperationOnScreen(e.key);
  } else if (e.key === "/" || e.key === "*" || e.key === "+" || e.key === "-") {
    if (!isOperatorPreviousTerm(operationLine)) {
      writeOperationOnScreen(e.key);
    }
  } else if (e.key === "=" || e.key === "Enter") {
    const result = operate();
    operationLine = result.toString();
    displayScreen.textContent = result;
  } else if (e.key === "." && !operationLine.includes(".")) {
    const lastTerm = operationLine.split(/[+\-*/]/).pop();
    if (!lastTerm.includes(".")) {
      writeOperationOnScreen(".");
    }
  } else if (e.key === "Backspace") {
    removeLastCharacter();
  }
});
