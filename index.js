/*change the style (colors) */
function changeStyle(){
    var pageTitle = document.querySelector(".mainFontPage")
    var meDiv = document.querySelector(".me")
    
    pageTitle.classList.toggle("titleStyle")
    meDiv.classList.toggle("meDivStyle");
    
}


/*title moovement on mouse */  
window.onload = function () {
var mainFontPage = document.querySelector(".mainFontPage")
var title = document.querySelector(".title")

const walk = 100;

function shadow (e){


    const width = mainFontPage.offsetWidth
    const height = mainFontPage.offsetHeight

    let x = e.offsetX
    let y = e.offsetY 

    if( this !== e.target){
        x = x + e.target.offsetLeft
        y = y +e.target.offsetTop
    }

    const xWalk = Math.round((x/ width * walk) - (walk / 2)) 
    const yWalk = Math.round((y/ height * walk) - (walk / 2))
    
   title.style.textShadow = `
   ${xWalk}px ${yWalk}px 0 #55EDC2, 
   ${xWalk * -1}px ${yWalk}px 0 #FF2ECC,
   ${xWalk}px ${yWalk* -1}px 0 #FF6663,
   ${yWalk}px ${xWalk * -1}px 0 #71FF89,
   ${yWalk* -0.5}px ${xWalk * -0.5}px 0 #E0FF4F
   `
   console.log(`shit ${xWalk}`)
 
   
   

    //las variables no funcionan ns xq 
}
mainFontPage.addEventListener("mousemove", shadow)
}
