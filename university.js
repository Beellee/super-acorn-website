//change the background color of the tiltes part 
//+ show the first extra info & hide second extra info
let titlesListener = document.querySelector(".titles")
let titleElements = titlesListener.querySelectorAll("h4")
let firstHide = document.querySelector("#firstHide")
titlesListener.addEventListener("click", function(title){
  if(title.target.nodeName == "H4"){
    titleElements.forEach(h=>{
      h.style.backgroundColor="transparent";
    });
    title.target.style.backgroundColor = "#c6c4c3" 
    firstHide.style.display="block"
    secondHide.style.display="none"
  }
})
//background of the first extra elements 
// + show the second extra info
let firstExtraElements = firstHide.querySelectorAll("p")
firstHide.addEventListener("click", function(title){
  console.log(firstExtraElements)
  if(title.target.nodeName == "P"){
    firstExtraElements.forEach(p=>{
      p.style.backgroundColor="transparent";
      p.style.color="#000000"
    });
    title.target.style.backgroundColor = "#1049d9" 
    title.target.style.color= "#ffffff"
    secondHide.style.display="block"
  }
})
//background of the second extra elements 
let secondExtraElements = secondHide.querySelectorAll("p")
secondHide.addEventListener("click", function(title){
  if(title.target.nodeName == "P"){
    secondExtraElements.forEach(p=>{
      p.style.backgroundColor="transparent";
      p.style.color="#000000"
    });
    title.target.style.backgroundColor = "#1049d9" 
    title.target.style.color= "#ffffff"
  }
})

// FUNCTIONS TO HIDE AND SHOW THE SPECIFIC FOLDERS
let subjects = document.querySelector("#subjects");
function showSubjects(){
  hideAll()
  subjects.style.display = "block"
}
let info = document.querySelector("#info");
function showInfo(){
  hideAll()
  info.style.display = "block"
}
function hideAll(){
  subjects.style.display = "none"
  info.style.display = "none"

}
