import { Display } from './Display.js';

// Input => ['1']   >   ['1', '1']  >   ['11', '.'] > ['11.', '1']  > ['11.1', '+'] > ['11.1', '+', '1']
// Output => ['1']  >   ['11']      >   ['11.',]    > ['11.1']      > ['11.1', '+'] > ['11.1', '+', '1']

export class Calculator extends Display {
  constructor() {
    super();

    this.initialization();
    this.bindEvents();
  }

  initialization() {
    this.resetKeyboardList();

    this.operators = ['*', '/', '+', '-'];
  }

  bindEvents() {
    this.addAllBindEventListener(this.btnNumbers, 'click', (e) => this.onClickKeyboardNumber(e));
    this.addAllBindEventListener(this.btnOperators, 'click', (e) => this.onClickKeyboardOperator(e));
    this.addAllBindEventListener(this.btnPoint, 'click', (e) => this.onClickKeyboardPoint(e));
    this.addAllBindEventListener(this.btnAC, 'click', () => this.onClickKeyboardAC());
    this.addAllBindEventListener(this.btnCE, 'click', () => this.onClickKeyboardCE());
    this.addAllBindEventListener(this.btnEqual, 'click', () => this.onClickKeyboardEqual());
  }

  addAllBindEventListener(selectorArr, event, fn) {
    selectorArr.forEach((e) => e.addEventListener(event, fn));
  }

  resetKeyboardList(isEmpty = false) {
    this.keyboardList = !isEmpty ? ['0'] : [];
  }

  resetAllCalculator() {
    this.resetKeyboardList();
    this.resetDisplay();
  }

  getValueEvent(e) {
    return e.target.closest('g').dataset.value;
  }

  getKeyboardAtListAtGivenPoint(point) {
    return this.keyboardList.slice(-point) || [];
  }

  lastKeyboardIsOperator() {
    const lastKeyboard = this.getKeyboardAtListAtGivenPoint(1)[0];
    return this.operators.includes(lastKeyboard);
  }

  lastKeyboardIsPoint() {
    const lastKeyboard = this.getKeyboardAtListAtGivenPoint(1)[0];
    return /\.$/.test(lastKeyboard);
  }

  removeLastKeyboardAtList() {
    this.keyboardList.pop();
    this.rebuildKeyboardList();
  }

  removeGivenPointCaractere(point) {
    const lastKeyboard = this.getKeyboardAtListAtGivenPoint(1)[0];
    return lastKeyboard.slice(0, -point);
  }

  replaceLastValueKeyboardAtList(value) {
    this.keyboardList[this.keyboardList.length - 1] = value;
  }

  replicateLastKeyboardAtList() {
    const lastKeyboardAtListWhateverNumber = this.keyboardList.reduceRight((acc, cur) => {
      if (!isNaN(cur) && acc === null) return cur;

      return acc;
    }, null);

    this.keyboardList.push(lastKeyboardAtListWhateverNumber);
    this.rebuildKeyboardList();
  }

  isFirstNumberAndInformedZero() {
    return this.keyboardList.length == 1 && this.keyboardList[0] == '0';
  }

  setKeyboardList(value) {
    this.keyboardList.push(value);
    this.rebuildKeyboardList();
  }

  setFlowKeyboardList(value) {
    this.setKeyboardList(value);
    this.setDisplay(this.keyboardList.join(''));
  }

  rebuildKeyboardList() {
    let currentValue = [];
    let newKeyboardList = [];

    this.keyboardList.forEach((value, index) => {
      if ((index == 0 && value == '-') || !this.operators.includes(value)) currentValue.push(value);
      else {
        newKeyboardList.push(currentValue.join(''));
        newKeyboardList.push(value);

        currentValue = [];
      }
    });

    if (currentValue.length > 0) newKeyboardList.push(currentValue.join(''));

    this.keyboardList = newKeyboardList;
  }

  calculatorKeyboardList() {
    const operators = {
      '*': (a, b) => parseFloat(a) * parseFloat(b),
      '/': (a, b) => parseFloat(a) / parseFloat(b),
      '+': (a, b) => parseFloat(a) + parseFloat(b),
      '-': (a, b) => parseFloat(a) - parseFloat(b),
    };

    let cloneKeyboardList = [...this.keyboardList];

    cloneKeyboardList = cloneKeyboardList.reduce((acc, cur, i, arr) => {
      if (operators[cur]) {
        const a = parseFloat(acc.pop());
        const b = parseFloat(arr[i + 1]);
        acc.push(operators[cur](a, b));
        arr.splice(i + 1, 1);
      } else if (!operators[arr[i - 1]]) {
        acc.push(cur);
      }
      return acc;
    }, []);

    return cloneKeyboardList;
  }

  calculatorByOperatorPercentage() {
    const [lastKeyboard, lastOperator, lastButOne] = this.getKeyboardAtListAtGivenPoint(3).reverse();
    let calcPercentage = 0;
    if (lastOperator == '*') calcPercentage = Number(lastKeyboard) / 100;
    else calcPercentage = Number(lastButOne) * (Number(lastKeyboard) / 100);

    return calcPercentage;
  }

  onClickKeyboardNumber(e) {
    const value = this.getValueEvent(e);
    const isFirstNumberAndInformedZero = this.isFirstNumberAndInformedZero();

    if (isFirstNumberAndInformedZero) {
      if (value == '0') return;
      else this.resetKeyboardList(true);
    }

    this.setFlowKeyboardList(value);
  }

  onClickKeyboardOperator(e) {
    const value = this.getValueEvent(e);
    const lastKeyboard = this.getKeyboardAtListAtGivenPoint(1)[0];
    const isFirstNumberAndInformedZero = this.isFirstNumberAndInformedZero();

    if (lastKeyboard.slice(-1) == '.') return;

    if (isFirstNumberAndInformedZero && value == '-') {
      this.resetKeyboardList(true);
      this.setFlowKeyboardList(value);
      return;
    }

    if (this.operators.includes(lastKeyboard)) return;

    if (value == '%') {
      if (this.keyboardList.length == 1) {
        this.resetAllCalculator();
        return;
      }

      const calcPercentage = String(this.calculatorByOperatorPercentage());
      this.setFlowKeyboardList(calcPercentage);
    }

    this.setFlowKeyboardList(value);
  }

  onClickKeyboardPoint(e) {
    const value = this.getValueEvent(e);
    const lastKeyboard = this.getKeyboardAtListAtGivenPoint(1)[0];

    if (/\./.test(lastKeyboard)) return;

    this.setFlowKeyboardList(value);
  }

  onClickKeyboardAC() {
    if (this.isFirstNumberAndInformedZero()) return;

    const removeLastCaractere = this.removeGivenPointCaractere(1);
    const keyboardListLengthIsZero = this.keyboardList.length - 1 == 0;

    if (!removeLastCaractere.length && keyboardListLengthIsZero) this.resetAllCalculator();
    else if (!removeLastCaractere.length) this.removeLastKeyboardAtList();
    else this.replaceLastValueKeyboardAtList(removeLastCaractere);

    this.setDisplay(this.keyboardList.join(''));
  }

  onClickKeyboardCE() {
    this.resetAllCalculator();
  }

  onClickKeyboardEqual() {
    if (this.keyboardList.length > 1 && this.lastKeyboardIsOperator()) {
      const bkpOperator = this.keyboardList.slice(-1);

      this.keyboardList.pop();
      const value = this.calculatorKeyboardList();

      this.keyboardList = [String(value), bkpOperator, String(value)];
    }

    if (this.lastKeyboardIsPoint())
      this.replaceLastValueKeyboardAtList(this.removeGivenPointCaractere(1));

    if (this.keyboardList.length == 1 && (Number(this.keyboardList[0]) == 0 || this.keyboardList[0] == '-')) {
      this.resetAllCalculator();
      return;
    }

    const value = this.calculatorKeyboardList();

    this.resetKeyboardList(true);
    this.resetDisplay();

    this.setFlowKeyboardList(value);
  }
}
