/*global variables*/
let color = "black"
let isMouseOver = false

function createGrid(size){
    let container = document.querySelector("#container")

  

    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for(let i = 0; i<(size * size); i++){
        let square = document.createElement("div")
        square.classList.add("square")
        square.style.border="1px solid black"
        container.insertAdjacentElement("beforeend", square)

        square.addEventListener("mousedown", colorSquares)//why if i put the call of the function wothout brackets it works but with them i doesn't. i dont have to have the variable square because im using this??
    }
}
createGrid(16)

function changeSize(input){
    if (input>= 2 && input <=100){
        let squares= container.querySelectorAll("div")
        squares.forEach((div)=> div.remove());
        createGrid(input)
    }else{
        console.log("error: not a valid number of squares!")
    }
    
}
//COLORS 

function changeColor(choice){
    color = choice;

    if ( color=== "pick"){
        let colorInput= document.querySelector("#color")
        let hexInput= document.querySelector("#hex")
    
        color = colorInput.value;
        hexInput.value = color
        let circle = document.querySelector(".circle")
        circle.style.backgroundColor = color
    }else if ( color === "backrgound"){
        let backColorInput= document.querySelector("#backColor")
        let backHexInput= document.querySelector("#backHex")

        color = backColorInput.value;
        backHexInput.value = color
        let background = document.querySelector("#container")
        background.style.backgroundColor = color
    }
}
function colorSquares(){
    this.style.backgroundColor = color; // this is refering to wathever we have the add event listener listenig to 
    if (color === "random"){
        randomColor = `hsl(${Math.random()* 360}, 100%, 50%)`;
        this.style.backgroundColor = randomColor
        let randomBotton = document.querySelector(".rainbow")
        randomBotton.style.backgroundColor = randomColor
    }
}

