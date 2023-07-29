export class Display {
  constructor() {
    this.display = document.querySelector('#display');
    this.buttons = document.querySelector('#buttons');

    this.btnNumbers = this.buttons.querySelectorAll('.on-click-number path');
    this.btnOperators = this.buttons.querySelectorAll('.on-click-operator path');

    this.btnEqual = this.buttons.querySelectorAll('g.btn-equal path');
    this.btnPoint = this.buttons.querySelectorAll('g.btn-point path');
    this.btnAC = this.buttons.querySelectorAll('g.btn-ac path');
    this.btnCE = this.buttons.querySelectorAll('g.btn-ce path');
  }

  setDisplay(text) {
    const currentText = this.replaceOperatorWithSymbol(text);
    this.display.textContent = currentText;
  }

  resetDisplay() {
    this.display.textContent = '0';
  }

  replaceOperatorWithSymbol(text) {
    return text.replace(/[÷]/g, (match) => ({ '÷': '/' }[match]));
  }
}
