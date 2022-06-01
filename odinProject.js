//button selectors 
console.log("hi")
const rockPaperScissorsButton = document.querySelector(".RockPaperScissorsMenu")
const etchSketchButton = document.querySelector(".etchSketchMenu")
const calculatorButton = document.querySelector(".calculatorMenu")
//project selectors
const rockPaperScissorsProject = document.querySelector(".rockPaperScissorsProject")
const etchSketchProject = document.querySelector(".etchSketchProject")
const calculatorProject = document.querySelector(".calculatorProject")
// for now the best way of making the other projects style none on the click of 
// a different project is setting that in the if statement of each function but 
// there has to be a better way 
rockPaperScissorsButton.onclick = function(){
    if(rockPaperScissorsProject.style.display != 'block'){
        deleteAll();
        rockPaperScissorsProject.style.display = 'block';
        
    } else{
        rockPaperScissorsProject.style.display= 'none';
    }
};
etchSketchButton.onclick = function (){
    if(etchSketchProject.style.display != 'block'){
        deleteAll()
        etchSketchProject.style.display = 'block';
       
    } else{
        etchSketchProject.style.display= 'none';
    }
}
calculatorButton.onclick = function(){
    if(calculatorProject.style.display != 'block'){
        deleteAll()
        calculatorProject.style.display = 'block';
        
    } else{
        calculatorProject.style.display= 'none';
    }
}
function deleteAll(){
    rockPaperScissorsProject.style.display= 'none';
    etchSketchProject.style.display= 'none';
    calculatorProject.style.display= 'none';
}