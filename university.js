let titles = document.querySelector(".titles")
let elementsInsideTitles = titles.querySelectorAll("div")
titles.addEventListener("click", function(element){

  elementsInsideTitles.forEach(element =>{
    element.style.backgroundColor="transparent";
  });

  element.target.style.backgroundColor = "#c6c4c3" 
})
