/**
 * Created by michpenn on 1/25/16.
 */
var box = $('#display');


function addToScreen(x) {
    box.value += x;
    if(x=='c') {
        box.value= '';
    }
    $(box).val(box.value);
}

function delete_oneEntry(){
    console.log('delete the last thing entered');
    box.value = '';
    $(box).val(box.value);
}

function answer(){
    console.log('this function solves the equation');
    var x=box.value;
    x = eval(x);
    box.value = x;
    $(box).val(box.value);
}

function backspace(){
    var number = box.value;
    var len = number.length-1;
    var newnumber = number.substring(0,len);
    box.value = newnumber;
    $(box).val(box.value);
}

function box_changed(){
    $(box.value).change(function(){
        console.log('the box changed');
    })
}


$(document).ready(function(){
box.value = '';
    box_changed();

});