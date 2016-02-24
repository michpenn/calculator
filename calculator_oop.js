/**
 * Created by michpenn on 1/26/16.
 */

//constructor for all possible inputs
var Input = function (value, type, hasDecimal, hasPrecedence) {
    this.value = value;
    this.type = type;
    this.hasDecimal = hasDecimal;
    this.hasPrecedence = hasPrecedence;
};

function Calculator(callback) {
    var self = this;
    self.currentInput = '';
    self.inputArray = [];
    self.calcResult = null;
    self.keypad_callback = callback;
}

Calculator.prototype = {
    constructor: Calculator,
    buttonClicked: function (val) {
        this.currentInput = val;
        this.checkTypeOfInput();
        this.keypad_callback(this.showDisplayString(this.inputArray));

    },
    checkTypeOfInput: function () {
        switch (this.currentInput) {
            case ('AC'):
                this.clicked_clearAll();
                break;
            case('C'):
                this.clicked_clear();
                break;
            case('+/-'):
                this.clicked_posneg();
                break;
            case('='):
                this.evaluate();
                break;
            case('.'):
                this.clicked_decimal();
                break;
            case('÷'):
            case('X'):
            case('-'):
            case('+'):
                this.clicked_operator();
                break;
            default:
                this.clicked_number();
                break;
        }
    },
    clicked_number: function () {
        var number;
        if (this.inputArray.length > 0) {
            var lastInput = this.inputArray[this.inputArray.length - 1];
            if (lastInput.type == 'number') {
                lastInput.value += this.currentInput;
            }
            else if (lastInput.type == 'operator') {
                number = new Input(this.currentInput, 'number', false, false);
                this.inputArray.push(number);

            }
        }
        else {
            number = new Input(this.currentInput, 'number', false, false);
            this.inputArray.push(number);
        }
    },
    clicked_decimal: function () {
        if (this.inputArray.length > 0) {
            var lastInput = this.inputArray[this.inputArray.length - 1];
            if (lastInput.type == 'number') {
                if (!lastInput.hasDecimal) {
                    lastInput.value += this.currentInput;
                    lastInput.hasDecimal = true;
                }

            }
            else if (lastInput.type != 'number') {
                var decimal_number = new Input('0.', 'number', true, false);
                this.inputArray.push(decimal_number);
            }

        }
        else {
            var number = new Input('0.', 'number', true, false);
            this.inputArray.push(number);
        }
    },
    clicked_operator: function () {
        if (this.inputArray.length > 0) {
            var operator;
            var lastInput = this.inputArray[this.inputArray.length - 1];
            switch (this.currentInput) {
                case('÷'):
                    operator = new Input('÷', 'operator', false, true);
                    break;
                case('X'):
                    operator = new Input('X', 'operator', false, true);
                    break;
                case('+'):
                    operator = new Input('+', 'operator', false, false);
                    break;
                case('-'):
                    operator = new Input('-', 'operator', false, false);
                    break;
            }
            if (lastInput.type == 'number') {
                this.inputArray.push(operator);
            }
            else if (lastInput.type == 'operator') {
                this.inputArray.splice(this.inputArray.length - 1, 1, operator);
            }
        }

    },
    clicked_posneg: function () {
        if (this.inputArray.length > 0) {
            var lastInput = this.inputArray[this.inputArray.length - 1];
            if (lastInput.type == 'number') {
                var valString = lastInput.value;
                if (valString.charAt(0) != '-') {
                    var negString = '-';
                    valString = negString.concat(valString);
                }
                else if (valString.charAt(0) == '-') {
                    valString = valString.slice(1)
                }
                lastInput.value = valString;
            }
        }
    },
    clicked_clear: function () {
        this.inputArray.splice(this.inputArray.length - 1, 1);
    },
    clicked_clearAll: function () {
        this.inputArray = [];
    },
    evaluate: function () {
        var inputStack = this.inputArray;
        var checkPrecedenceFlag = true;
        var counter = 0;
        var i = 0;
        if(inputStack[inputStack.length-1].type === 'number'){
            while (inputStack.length > 1) {
                if (checkPrecedenceFlag) {
                    if (inputStack[i].type == 'number' || (inputStack[i].type == 'operator' && (!inputStack[i].hasPrecedence))) {
                        i++;
                        if (i >= inputStack.length - 1) {
                            checkPrecedenceFlag = false;
                            i = 0;
                        }
                        continue;
                    }
                }
                if (inputStack[i].type == 'operator') {
                    var result;
                    switch (inputStack[i].value) {
                        case('+'):
                            result = this.addition(inputStack[i - 1].value, inputStack[i + 1].value);
                            break;
                        case('-'):
                            result = this.subtraction(inputStack[i - 1].value, inputStack[i + 1].value);
                            break;
                        case('X'):
                            result = this.multiplication(inputStack[i - 1].value, inputStack[i + 1].value);
                            break;
                        case('÷'):
                            result = this.division(inputStack[i - 1].value, inputStack[i + 1].value);
                            break;
                    }
                    result = new Input(result, 'number', false, false);
                    inputStack.splice(i - 1, 3, result);
                    i = 0;
                }
                i++;
                counter++;
                if (counter > 200) {
                    break;
                }

            }
            self.calcResult = inputStack[inputStack.length - 1];
        }
        else if (inputStack[inputStack.length-1].type === 'operator') {
            console.log(inputStack[inputStack.length-1]);
            //while (inputStack.length > 1) {}
        }
    }
    ,
    addition: function (param1, param2) {
        var sum = parseFloat(param1) + parseFloat(param2);
        return sum;
    }
    ,
    subtraction: function (param1, param2) {
        var difference = parseFloat(param1) - parseFloat(param2);
        return difference;
    }
    ,
    multiplication: function (param1, param2) {
        var product = parseFloat(param1) * parseFloat(param2);
        return product;
    }
    ,
    division: function (param1, param2) {
        var quotient = parseFloat(param1) / parseFloat(param2);
        return quotient;
    },
    showDisplayString: function (array) {
        var displayString = '';
        for (var i = 0; i < array.length; i++) {
            displayString += array[i].value;
        }
        return displayString;
    }


};

function Keypad() {
    var self = this;
    self.currentValue = '';
}

Keypad.prototype = {
    constructor: Keypad,
    passValue: function (input, calc) {
        this.currentValue = input[0].value;
        calc.buttonClicked(this.currentValue);
    }.bind(this)
};


$(document).ready(function () {
    var calculator = new Calculator(function (displayString) {
        $('#display').val(displayString);
    });
    var keypad = new Keypad();
    $('.keys').on('click', function (e) {
        keypad.passValue($(e.target), calculator);
    });


});