const { assert } = chai;

describe("Calculator", function () {
  it("Should handle simple operations properly", function () {
    const calculator = new Calculator();
    assert.equal(calculator.operand, "");
    assert.equal(calculator.operator, "");
    assert.equal(calculator.currentNumber, "0");

    calculator.handleSymbol("del");
    assert.equal(calculator.operand, "");
    assert.equal(calculator.operator, "");
    assert.equal(calculator.currentNumber, "0");

    calculator.handleSymbol("0");
    assert.equal(calculator.operand, "");
    assert.equal(calculator.operator, "");
    assert.equal(calculator.currentNumber, "0");

    calculator.handleSymbol("5");
    assert.equal(calculator.operand, "");
    assert.equal(calculator.operator, "");
    assert.equal(calculator.currentNumber, "5");

    calculator.handleSymbol("del");
    assert.equal(calculator.operand, "");
    assert.equal(calculator.operator, "");
    assert.equal(calculator.currentNumber, "0");

    calculator.handleSymbol("5");
    calculator.handleSymbol("1");
    assert.equal(calculator.operand, "");
    assert.equal(calculator.operator, "");
    assert.equal(calculator.currentNumber, "51");

    calculator.handleSymbol("0");
    assert.equal(calculator.operand, "");
    assert.equal(calculator.operator, "");
    assert.equal(calculator.currentNumber, "510");

    calculator.handleSymbol("del");
    assert.equal(calculator.operand, "");
    assert.equal(calculator.operator, "");
    assert.equal(calculator.currentNumber, "51");

    calculator.handleSymbol("+");
    assert.equal(calculator.operand, "51");
    assert.equal(calculator.operator, "+");
    assert.equal(calculator.currentNumber, "0");

    calculator.handleSymbol("del");
    assert.equal(calculator.operand, "51");
    assert.equal(calculator.operator, "+");
    assert.equal(calculator.currentNumber, "0");

    calculator.handleSymbol("0");
    assert.equal(calculator.operand, "51");
    assert.equal(calculator.operator, "+");
    assert.equal(calculator.currentNumber, "0");

    calculator.handleSymbol("5");
    assert.equal(calculator.operand, "51");
    assert.equal(calculator.operator, "+");
    assert.equal(calculator.currentNumber, "5");

    calculator.handleSymbol("=");
    assert.equal(calculator.operand, "");
    assert.equal(calculator.operator, "");
    assert.equal(calculator.currentNumber, "56");

    calculator.handleSymbol("/");
    assert.equal(calculator.operand, "56");
    assert.equal(calculator.operator, "/");
    assert.equal(calculator.currentNumber, "0");

    calculator.handleSymbol("2");
    assert.equal(calculator.operand, "56");
    assert.equal(calculator.operator, "/");
    assert.equal(calculator.currentNumber, "2");

    calculator.handleSymbol("=");
    assert.equal(calculator.operand, "");
    assert.equal(calculator.operator, "");
    assert.equal(calculator.currentNumber, "28");
  });

  it("Should calculate results without the user pressing =", () => {
    const calculator = new Calculator();
    calculator.handleSymbol("1");
    assert.equal(calculator.operand, "");
    assert.equal(calculator.operator, "");
    assert.equal(calculator.currentNumber, "1");

    calculator.handleSymbol("2");
    assert.equal(calculator.operand, "");
    assert.equal(calculator.operator, "");
    assert.equal(calculator.currentNumber, "12");

    calculator.handleSymbol("+");
    assert.equal(calculator.operand, "12");
    assert.equal(calculator.operator, "+");
    assert.equal(calculator.currentNumber, "0");

    calculator.handleSymbol("4");
    assert.equal(calculator.operand, "12");
    assert.equal(calculator.operator, "+");
    assert.equal(calculator.currentNumber, "4");

    calculator.handleSymbol("*");
    assert.equal(calculator.operand, "16");
    assert.equal(calculator.operator, "*");
    assert.equal(calculator.currentNumber, "0");

    calculator.handleSymbol("2");
    assert.equal(calculator.operand, "16");
    assert.equal(calculator.operator, "*");
    assert.equal(calculator.currentNumber, "2");

    calculator.handleSymbol("=");
    assert.equal(calculator.operand, "");
    assert.equal(calculator.operator, "");
    assert.equal(calculator.currentNumber, "32");
  });
});
