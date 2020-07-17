class Calculator {
    constructor(previousTxtElement, currentTxtElement){
        this.previousTxtElement = previousTxtElement;
        this.currentTxtElement = currentTxtElement;
        this.clear();
    }
    clear(){
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    insertNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number;
    }
    chooseOperation(operation){
        if (this.currentOperand == null) return;
        if (this.previousOperand != null){
            this.compute()
        }
        this.previousOperand = this.currentOperand;
        this.operation = operation;
        this.currentOperand = '';
    }
    compute(){
        let mathAnswer;
        const prev = this.previousOperand;
        const curr = this.currentOperand;
        switch(this.operation){
            case '+':
                mathAnswer = prev + curr;
                break;
            case '-':
                mathAnswer = prev - curr;
                break;
            case '×':
                mathAnswer = prev * curr;
                break;
            case '÷':
                mathAnswer = prev / curr;
                break;
            default:
                return;
        }
        this.currentOperand = mathAnswer;
        this.operation = undefined;
        this.previousOperand = '';
    }
    updateDisplay(){
        this.previousTxtElement.innerText = this.previousOperand;
        this.currentTxtElement.innerText = this.currentOperand;
    }
}

const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const ACButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousTxtElement = document.querySelector('[data-previous]');
const currentTxtElement = document.querySelector('[data-current]');

const calculator = new Calculator(previousTxtElement, currentTxtElement);

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.insertNumber(button.innerText);
        calculator.updateDisplay();
    })
})
operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})
equalButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})
ACButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})