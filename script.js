//constants values
const operators = ["+", "-", "*", "%", "/"];
// Variables Section
let expression = "";
let result = "";

// HTML elements Section
const welcome = document.querySelector(".welcome");
const calculator = document.querySelector(".calc-container");
const startCalcBtns = document.querySelectorAll(".start-calc-btn");
const navButton = document.getElementById("nav-button");

const expressionElement = document.getElementById("expression");
const resultElement = document.getElementById("result");
const resultSignElement = document.getElementById("result-sign");
const screenPlaceholder = document.getElementById("calc-screen-placeholder");

const numbers = document.querySelectorAll(".number");
const operatorElements = document.querySelectorAll(".operator");
const clearElement = document.getElementById("clear");
const deleteElement = document.getElementById("delete");

const equalBtn = document.getElementById("equal");
const percentElement = document.getElementById("percent");
const header = document.querySelector("header");

// Functions Section
//Clear the placeholder on the display section of the calculator
function clearScreenPlaceholder() {
  if (screenPlaceholder.textContent != "") screenPlaceholder.textContent = "";
}

// Reset the display placeholder: Redisplay it
function resetScreenPlaceholder() {
  screenPlaceholder.textContent = "Calculator X";
}

// Update the display section
function updateDisplay(expression) {
  // Remove previous dimmed style if exists
  expressionElement.classList.remove("expression-dimmed");

  expressionElement.textContent = expression;
}

// Reset result
function resetResult() {
  result = "";
  expression = "";
  resultSignElement.textContent = "";
  resultElement.textContent = result;
}

// Event handlers Section
function toggleCalculator() {
  welcome.classList.toggle("hidden"); // Toggle welcome card visibily
  calculator.classList.toggle("hidden"); // Toggle calculator visibily

  // Change Nav button text when toggling calculator
  if (welcome.classList.contains("hidden")) {
    navButton.textContent = "Leave Calculator";
    //Hide the header on calculator interface
    header.style.display = "none";
  } else {
    navButton.textContent = "Start Calculating";
  }
}

function onNumberPressed(event) {
  clearScreenPlaceholder();
  if (result.length !== 0) resetResult();

  expression += event.target.textContent;
  updateDisplay(expression);
}

const onOperatorPressed = event => {
  if (expression === "") return;

  clearScreenPlaceholder();

  /* If the last character in current expression is an operator, then we exit
  Avoid this: --/++/%%...
  */
  if (operators.includes(expression.slice(-1))) return;

  expression += event.target.value;
  updateDisplay(expression);
};

const onClear = () => {
  expression = "";
  updateDisplay(expression);
  resetScreenPlaceholder();
  resetResult();
};

const onDeletePressed = () => {
  // Block deletion if there is a result
  if (result.length !== 0) return;

  expression = expression.slice(0, -1);
  updateDisplay(expression);
  if (expression === "") {
    resetScreenPlaceholder();
    resetResult();
  }
};

const onGetResult = () => {
  if (expression === "") return;

  try {
    result = eval(`${expression}`);
    // Change <<expressionElement>> fontsize, color
    expressionElement.classList.add("expression-dimmed");

    resultSignElement.textContent = "=";
    resultElement.textContent = result;
  } catch (error) {
    expression = "";
    updateDisplay(expression);
    screenPlaceholder.textContent = "Error";
  }
};

const onPercentPressed = () => {
  // If expression is empty, we exit OR if there is an operator in the expression, we exit
  if (expression === "" || operators.some(op => expression.includes(op)))
    return;
  expressionElement.textContent += percentElement.value;

  result = parseFloat(expression) / 100;
  // Change <<expressionElement>> fontsize, color
  expressionElement.classList.add("expression-dimmed");

  resultSignElement.textContent = "=";
  resultElement.textContent = result;
};

/* Attaching events */
startCalcBtns.forEach(button =>
  button.addEventListener("click", toggleCalculator)
);

numbers.forEach(number => number.addEventListener("click", onNumberPressed));

operatorElements.forEach(operator =>
  operator.addEventListener("click", onOperatorPressed)
);

clearElement.addEventListener("click", onClear);
deleteElement.addEventListener("click", onDeletePressed);
equalBtn.addEventListener("click", onGetResult);
percentElement.addEventListener("click", onPercentPressed);
