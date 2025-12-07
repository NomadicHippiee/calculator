const calculatorButtons = document.querySelector("#button-container");
const display = document.querySelector("#display");

const rows = [
  ["Clear", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

const allButtons = [];

let currentInput = "0";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

rows.forEach((rowArray) => {
  const rowDiv = document.createElement("div");
  rowDiv.className = "row";

  rowArray.forEach((text) => {
    const btn = document.createElement("button");
    allButtons.push(btn);
    btn.className = "btn";
    btn.textContent = text;

    if ("0123456789".includes(text)) {
      btn.classList.add("number");
    }

    if (["+", "-", "*", "/"].includes(text)) {
      btn.classList.add("operator");
    }

    if (text === ".") {
      btn.classList.add("decimal");
    }

    if (text === "Clear") {
      btn.classList.add("clear");
    }

    if (text === "0") {
      btn.classList.add("zero");
    }

    rowDiv.appendChild(btn);
  });

  calculatorButtons.appendChild(rowDiv);
});

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  if (operator === "+") {
    return add(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "*") {
    return multiply(num1, num2);
  } else if (operator === "/") {
    return divide(num1, num2);
  } else {
    return "ERROR";
  }

}

allButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const value = button.textContent.trim();

    if ("0123456789".includes(value)) {
    
      if (currentInput === "0" || waitingForSecondNumber) {
        currentInput = value;
      } else {
        currentInput += value;
      }

      display.textContent = currentInput;
      waitingForSecondNumber = false;

    } else if (value === "Clear") {
      currentInput = "0";
      firstNumber = null;
      operator = null;
      waitingForSecondNumber = false;
      display.textContent = currentInput;

    } else if (value === ".") {

      if (!currentInput.includes(".")) {
        currentInput += ".";
        display.textContent = currentInput;
      }

    } else if (["+", "-", "*", "/"].includes(value)) {
      firstNumber = parseFloat(currentInput);
      operator = value;
      display.textContent = currentInput + " " + value;
      currentInput = "";
      waitingForSecondNumber = true;

    } else if (value === "=") {
    // Only calculate if we have everything we need
    if (firstNumber !== null && operator !== null && currentInput !== "") {
        const secondNumber = parseFloat(currentInput);
        const result = operate(operator, firstNumber, secondNumber);

        // Show result
        display.textContent = result;

        // Prepare for next operation (chaining)
        currentInput = result.toString();
        firstNumber = result;           // ← important for chaining
        operator = null;
        waitingForSecondNumber = true;  // ready for new operator
    }
}
  });
});
