// FUNCTIONS TO CALCULATE
function add(a,b){
    return a+b
}
function substract(a,b){
    return a-b
}
function multiply(a,b){
    return a*b
}
function divide(a,b){
    return a / b
}

function operate(firstNumber,operator,secondNumber){
    firstNumber = Number(firstNumber)
    secondNumber = Number(secondNumber)
    
    switch(operator){
        case "+":
            return add(firstNumber,secondNumber)
        case "-":
            return substract(firstNumber,secondNumber)
        case "*":
            return multiply(firstNumber,secondNumber)
        case "/":
            return divide(firstNumber,secondNumber)  
        default: return "the operation you want to do is not described yet"
    }
}
// FUNCTION TO DISPLAY THE TEXT IN THE WINDOW (div)
let calculatorWindow =document.querySelector(".window")
let operationsToDo =""
function setText(a){
    if(a==="+"||a==="-"||a==="*"||a==="/"||a==="%"){
        calculatorWindow.innerHTML += " "+a+" ";  
    }else{
        calculatorWindow.innerHTML += a;
    }
}
// FUNCTION TO PREPARE THE OPERATIONS FOR THE operate() func.

function preOperate(){
    operationsToDo = calculatorWindow.innerHTML // save the operations asked to do 
    let arrayOfOperations = operationsToDo.split(" ")

  while(arrayOfOperations.includes("*")||arrayOfOperations.includes("/")){
        const firstOperatorIndex = arrayOfOperations.findIndex(item => item ==="*")
        const secondOperatorIndex = arrayOfOperations.findIndex(item => item ==="/")
    
        if(firstOperatorIndex<secondOperatorIndex && firstOperatorIndex>0 || secondOperatorIndex<0){
            let firstNumber = arrayOfOperations[firstOperatorIndex-1]
            let operator= arrayOfOperations[firstOperatorIndex]
            let secondNumber = arrayOfOperations[firstOperatorIndex+1]
            let result = operate(firstNumber,operator,secondNumber).toString()

            arrayOfOperations.splice(firstOperatorIndex-1, 3, result);

        }else if(secondOperatorIndex>0){
            let firstNumber = arrayOfOperations[secondOperatorIndex-1]
            let operator= arrayOfOperations[secondOperatorIndex]
            let secondNumber = arrayOfOperations[secondOperatorIndex+1]
            let result = operate(firstNumber,operator,secondNumber).toString()
            
            arrayOfOperations.splice(secondOperatorIndex-1, 3, result);
        }
    }
    while(arrayOfOperations.includes("+")||arrayOfOperations.includes("-")){
        const firstOperatorIndex = arrayOfOperations.findIndex(item => item ==="+")
        const secondOperatorIndex = arrayOfOperations.findIndex(item => item ==="-")
    
        if(firstOperatorIndex<secondOperatorIndex && firstOperatorIndex>0 || secondOperatorIndex<0){
            let firstNumber = arrayOfOperations[firstOperatorIndex-1]
            let operator= arrayOfOperations[firstOperatorIndex]
            let secondNumber = arrayOfOperations[firstOperatorIndex+1]
            let result = operate(firstNumber,operator,secondNumber).toString()

            arrayOfOperations.splice(firstOperatorIndex-1, 3, result);

        }else if(secondOperatorIndex>0){
            let firstNumber = arrayOfOperations[secondOperatorIndex-1]
            let operator= arrayOfOperations[secondOperatorIndex]
            let secondNumber = arrayOfOperations[secondOperatorIndex+1]
            let result = operate(firstNumber,operator,secondNumber).toString()
            
            arrayOfOperations.splice(secondOperatorIndex-1, 3, result);
        }
    }
    calculatorWindow.innerHTML=arrayOfOperations;
}
/*  FOR THE RECORD
i also made this (which i thought was going to work) but i realiced that it was giving problems because of the preestablished order of the operations 
so thats why i made the above part of code that takes into account the order of opertions (first * & / and then - & +) and inside of those it takes into account the order that the user wrote the operations    
    while(arrayOfOperations.includes("+")){

        const operatorIndex = arrayOfOperations.findIndex(item => item ==="+")
    
        let firstNumber = arrayOfOperations[operatorIndex-1]
        let operator= arrayOfOperations[operatorIndex]
        let secondNumber = arrayOfOperations[operatorIndex+1]
        let result = operate(firstNumber,operator,secondNumber)

        arrayOfOperations.splice(operatorIndex-1, 3, result);
    }
I did one of these for each of the symbols (aka + - * /)
    
    console.log(arrayOfOperations)
*/
// FUNCTIONS TO DELETE OR REMOVE TEXT FROM THE CALCULATOR WINDOW
function deleteOne(){
    calculatorWindow.innerHTML= calculatorWindow.innerHTML.slice(0, -1)
}
function deleteAll(){
    calculatorWindow.innerHTML=""
}
//CODE TO ADD OPERATIONS WITH KEYBOARD
window.addEventListener("keydown", keyboardOperate)
function keyboardOperate(event){
    var key =event.key;
    
    if (key === "+" || key ==="-"|| key ==="*"|| key ==="/"|| key ==="1"|| key ==="2"|| key ==="3"|| key ==="4"|| key ==="5"|| key ==="6"|| key ==="7"|| key ==="8"|| key ==="9"|| key ==="0"|| key ==="."){
        setText(key)
    }else if (key === "Enter"){
        preOperate() 
    }else if (key === "Backspace"){
        deleteOne()
    }  
}

// CODE TO LET THE USER DRAG THE CALC 
// Make the DIV element draggable:
dragElement(document.getElementById("calculator"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById("calcHeader")) {
        // if present, the header is where you move the DIV from:
        document.getElementById("calcHeader").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown();
    }

  function dragMouseDown(e) {
        //change to grabbing icon 
        document.getElementById("calcHeader").style.cursor="grabbing"
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

  function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

  function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        //change to grab icon 
        document.getElementById("calcHeader").style.cursor="grab"
    }
}