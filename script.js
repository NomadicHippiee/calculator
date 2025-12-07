const calculatorButtons = document.querySelector("#button-container");

const rows = [
  ["Clear", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

const allButtons = [];

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

// 2. Add a click listener to every button
allButtons.forEach(button => {
    button.addEventListener('click', function () {
        
        // This function runs every time ANY button is clicked
        
        // Get the text/value of the button that was clicked
        const value = button.textContent.trim();   // "7", "+", "Clear", "=", etc.
        
        // For now just prove it works — show it in the console
        console.log('Button clicked →', value);
        
        // LATER (very soon) we will replace this console.log
        // with real calculator logic (update display, store numbers, etc.)
    });
});
