/**
 * Created by michpenn on 1/26/16.
 */
function assignClickHandlers() {
    var keys = $('.keys');
    for (var i = 0; i < keys.length; i++) {
        var thiskey = keys[i];
        var classList = keys[i].classList;
        var button_type = classList[1];
        switch (button_type) {
            case 'clearAll':
                $(thiskey).click(function () {
                    console.log('clear all click handler should be applied here');
                    console.log('a button was clicked: ' + $(e.target).prop('value'));
                });
                break;
            case 'clear':
                $(thiskey).click(function (e) {
                    console.log('clear click handler applied here');
                    console.log('a button was clicked: ' + $(e.target).prop('value'));
                });
                break;
            case 'posneg':
                $(thiskey).click(function (e) {
                    console.log('positive to negative handler');
                    console.log('a button was clicked: ' + $(e.target).prop('value'));
                });
                break;
            case 'operator':
                $(thiskey).click(function (e) {
                    console.log('operator handler');
                    console.log('a button was clicked: ' + $(e.target).prop('value'));
                });
                break;
            case 'number':
                $(thiskey).click(function (e) {
                    var number = $(e.target).prop('value');
                    console.log('a button was clicked: ' + number + ' ' + typeof number);
                    inputs(number);
                });
                break;
            case 'decimal':
                $(thiskey).click(function (e) {
                    console.log('decimal handler');
                    console.log('a button was clicked: ' + $(e.target).prop('value'));
                });
                break;
            case 'equal':
                $(thiskey).click(function (e) {
                    console.log('equal handler');
                    console.log('a button was clicked: ' + $(e.target).prop('value'));
                });
                break;
            default:
                console.log('something is not registered');
                break;

        }
    }
}

function inputs(x) {
    var self = this;
    self.justclicked = x;
    self.input;
    self.decimalclicked = false;
    self.inputArray = [];
    //the first item registered can only be a number or a decimal
    if (!self.input) {
        console.log('first number is undefined');
        if (typeof parseInt(self.justclicked) == 'number') {
            self.input = self.justclicked;
            self.viewDisplay();
        }
        else if (self.justclicked == '.') {
            self.input = self.justclicked;
            self.decimalclicked = true;
            self.viewDisplay();
        }
    }
    self.viewDisplay = (function() {
        $('#display').val(self.input);
    });


}


$(document).ready(function () {
    assignClickHandlers();
});