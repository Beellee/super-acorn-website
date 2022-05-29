/*change the style (colors) */
var timesClicked = 0 // i've created this variable to style the more! buttons
//i have also used it to change the shadow color depending on the style
function changeStyle(){
    timesClicked++  
    var header = document.querySelector(".header")
    var pageTitle = document.querySelector(".mainFontPage")
    var meDiv = document.querySelector(".me")
    const projectsPage= document.querySelector('.projectsText')
    const moreButton = projectsPage.querySelectorAll('button')

    
    header.classList.toggle("headerStyle")
    pageTitle.classList.toggle("titleStyle")
    meDiv.classList.toggle("meDivStyle");

    if(timesClicked % 2 == 0){
        moreButton.forEach((element)=>{
            element.style.backgroundColor="#0f0f0f"
        });
    } else {
        moreButton.forEach((element)=>{
            element.style.backgroundColor="#d79def"
        });
    } 
}


/*title moovement on mouse */  
window.onload = function mouseMoovement() {
var mainFontPage = document.querySelector(".mainFontPage")
var title = document.querySelector(".title")

const walk = 100;
mainFontPage.addEventListener("mousemove", shadow)

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
    


   if(timesClicked % 2 == 0){
       //soso comb
       title.style.textShadow = `
       ${xWalk}px ${yWalk}px 0 #C2C2C2, 
       ${xWalk * -2}px ${yWalk * 2}px 0 #B8B8B8,
       ${xWalk}px ${yWalk* -1}px 0 #F5F5F5,
       ${yWalk}px ${xWalk * -1}px 0 #999999
       `  
   }else {
        title.style.textShadow = `
        ${xWalk}px ${yWalk}px 0 #f33030, 
        ${xWalk * -2}px ${yWalk * 2}px 0 #e4fdb9,
        ${xWalk}px ${yWalk* -1}px 0 #fabe56,
        ${yWalk}px ${xWalk * -1}px 0 #d871e8
        `       
   }
}

}
