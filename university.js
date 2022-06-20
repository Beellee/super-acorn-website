//selectors for the titles part 
let titlesListener = document.querySelector(".titles")
let titleElements = titlesListener.querySelectorAll("h4")
// selectos for the firstExtraInfo part 
let firstExtraListener=document.querySelector(".firstExtraInfo")
let firstExtraElements = firstExtraListener.querySelectorAll("p")
// selectors for the secondExtraInfo part 
let secondExtraListener=document.querySelector(".secondExtraInfo")
let secondExtraElements = secondExtraListener.querySelectorAll("p")

titlesListener.addEventListener("click", function(title){
  if(title.target.nodeName == "H4"){
    titleElements.forEach(h=>{
      h.style.backgroundColor="transparent";
    });
    title.target.style.backgroundColor = "#c6c4c3" 
  }
})
firstExtraListener.addEventListener("click", function(title){
  if(title.target.nodeName == "P"){
    firstExtraElements.forEach(p=>{
      p.style.backgroundColor="transparent";
      p.style.color="#000000"
    });
    title.target.style.backgroundColor = "#1049d9" 
    title.target.style.color= "#ffffff"
  }
})
secondExtraListener.addEventListener("click", function(title){
  if(title.target.nodeName == "P"){
    secondExtraElements.forEach(p=>{
      p.style.backgroundColor="transparent";
      p.style.color="#000000"
    });
    title.target.style.backgroundColor = "#1049d9" 
    title.target.style.color= "#ffffff"
  }
})
