class Calculator {
  constructor() {
    this.clear();
  }

  handleSymbol(symbol) {
    if (this.isDigit(symbol)) this.handleDigit(symbol);
    else if (this.isOperator(symbol)) this.handleOperator(symbol);
    else if (symbol === "=") this.handleEquals();
    else if (symbol === "del") this.handleDelete();
    else if (symbol === "clr") this.clear();
    else throw new Error(`Unknown symbol ${symbol}`);
  }

  isDigit(symbol) {
    return /^\d$/.test(symbol);
  }

  handleDigit(digit) {
    if (this.currentNumber === "0") this.currentNumber = digit;
    else this.currentNumber += digit;
  }

  isOperator(symbol) {
    return /^[+\-*/]$/.test(symbol);
  }

  handleOperator(operator) {
    if (this.operator !== "") this.calculate();

    this.operand = this.currentNumber;
    this.operator = operator;
    this.currentNumber = "0";
  }

  handleEquals() {
    this.calculate();
  }

  calculate() {
    const operand = Number(this.operand);
    let currentNumber = Number(this.currentNumber);

    switch (this.operator) {
      case "+":
        currentNumber = operand + currentNumber;
        break;
      case "-":
        currentNumber = operand - currentNumber;
        break;
      case "*":
        currentNumber = operand * currentNumber;
        break;
      case "/":
        currentNumber = Math.round(operand / currentNumber);
        break;
    }

    this.operand = "";
    this.operator = "";
    this.currentNumber = currentNumber.toString();
  }

  handleDelete() {
    if (this.currentNumber.length < 1) return;
    this.currentNumber = this.currentNumber.substr(
      0,
      this.currentNumber.length - 1
    );
    if (this.currentNumber === "") this.currentNumber = "0";
  }

  clear() {
    this.operand = "";
    this.operator = "";
    this.currentNumber = "0";
  }
}
