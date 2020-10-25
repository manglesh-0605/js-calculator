// grabbing each data using data operation
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previous = document.querySelector('[data-previous]');
const current = document.querySelector('[data-current]');
//definign class calculator
class Calculator {
    constructor(previous, current) {
        this.previous = previous;
        this.current = current;
        this.clear();
    }
// this function clears everything.
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;

    }
// this function deletes the last added value or operator on the output screen
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);

    }
//this function appends the numbers as we input by converting them into a string
    appendNumber(number) {
        if (number == '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();


    }
// this function takes operation and call compute function if operation is not null and shifts the 
//current value and previous and clears the previous value 
    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";


    }
     
    // all calculation is done in this function
    compute() {
        let result;
        const pre = parseFloat(this.previousOperand);
        const cur = parseFloat(this.currentOperand);
        if (isNaN(pre) || isNaN(cur)) return;
        switch (this.operation) {
            case "+":
                result = pre + cur;
                break;
            case "-":
                result = pre - cur;
                break;
            case "*":
                result = pre * cur;
                break;
            case "÷":
                result = pre / cur;
                break;
            default:
                return;
        }

        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = ""




    }
// this function helps the number to be displayed in correct format
    getDisplayNumber(number){
        const stringNumber=number.toString();
        const integerDigit=parseFloat(stringNumber.split('.')[0]);
        const decimalDigit=stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigit)){
            integerDisplay=""
        }else{
            integerDisplay=integerDigit.toLocaleString('en',{
                maximumFractionDigits:0
            })
        }
        if(decimalDigit!=null){
            return `${integerDisplay}.${decimalDigit}`
        }else{
            return integerDisplay;
        }

    }

    // this function updates the display
    updateDisplay() {
        this.current.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previous.innerText = `${this.previousOperand} ${this.operation}`;
        }else{
            this.previous.innerText="";
        }
    }
}


// this is an object of the class
const calculator = new Calculator(previous, current);

numberButtons.forEach((button) => { // this function makes all number buttons part of an array   
            button.addEventListener('click', () => { //and loops through the array..
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })

})
operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText); //does same with the operator buttons
        calculator.updateDisplay();
    })

})


equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});
allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});