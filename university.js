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
/*Rules 
🟢 elements with this are from the title part (the one that it's at the left)
🟡 elements with this are from the subfolders>firstHide part (the one that it's at the middle)
🔴 elements with this are from the subfolders>secondHide part (the one that it's at the right)
*/
//🟢🟡 when u click the title part(things that appear from the first extra info)
let subjects = document.querySelector("#subjects");
function showSubjects(){
  hideAllFirstExtra()
  subjects.style.display = "block"
}
let university= document.querySelector("#university")
function showUniversity(){
  hideAllFirstExtra()
  university.style.display = "block"
}
let info = document.querySelector("#info");
function showInfo(){
  hideAllFirstExtra()
  info.style.display = "block"
}
function hideAllFirstExtra(){
  subjects.style.display = "none"
  info.style.display = "none"
  university.style.display = "none"
}
// 🟡 when u click the first extra info part (things that pop up)
// about info
let infoDocument = document.querySelector("#infoGoIn"); 
function showInfoDocument(){
  infoDocument.style.left="35vw"
  infoDocument.style.width="45vw"
  infoDocument.style.height="70vh"

  infoDocument.style.display= "block"
}
function deleteInfo(){
  infoDocument.style.display="none"
}
function hideInfo(){
  // I haven´t been able to hide info on the click of the yellow button
  infoDocument.style.display="none"
}
function bigInfo(){ 
  infoDocument.style.left="0"
  infoDocument.style.width="100%"
  infoDocument.style.height="100%"
}
// 🟡🔴 things from the second extra info that appear when u click the first extra info part
let infoImg = document.querySelector("#secondInfo")
function showInfoImage(){
  hideAllSecondExtra()
  infoImg.style.display= "block"
}
let universityImg=document.querySelector("#secondUniversity")
function showUniversityImage(){
  hideAllSecondExtra()
  universityImg.style.display= "block"
}
//🔴 things that you can click in the second extra info
/* cuando añadas una nueva asignatura esto es lo que hay que hacer: 
- crear un let para seleccionar el contenido a mostrar 
- crear una funcion para mostrar el contenido 
- añadir display = "none" del elemento creado en la funcion hideAllSecondExtra*/
let probabilidadFolderContent = document.querySelector("#secondProbabilidad")
function showProbabilidadContent(){
  hideAllSecondExtra()
  probabilidadFolderContent.style.display="block"
}
let pensamientoCompFolderContent = document.querySelector("#secondPensamientoComp")
function shwopensamientoComp(){
  hideAllSecondExtra()
  pensamientoCompFolderContent.style.display="block"
}
let analisisMultiVarFolderContent = document.querySelector("#secondAnalisisMultivar")
function showAnalisisMultiVar(){
  hideAllSecondExtra()
  analisisMultiVarFolderContent.style.display="block"
}
let algebraLinealFolderContent = document.querySelector("#secondAlgebraLinear")
function showAlgebraLinear(){
  hideAllSecondExtra()
  algebraLinealFolderContent.style.display="block"
}
let basesDatosFolderContent = document.querySelector("#secondBasesDatos")
function showBasesDatos(){
  hideAllSecondExtra()
  basesDatosFolderContent.style.display="block"
}

function hideAllSecondExtra(){
  infoImg.style.display= "none"
  universityImg.style.display= "none"
  probabilidadFolderContent.style.display="none"
  pensamientoCompFolderContent.style.display="none"
  analisisMultiVarFolderContent.style.display="none"
  algebraLinealFolderContent.style.display="none"
  basesDatosFolderContent.style.display="none"
}

/* pop up para info de bases de datos */
let infoBasesDatos = document.querySelector("#infoBasesDatosGoIn"); 
function showBdDocument(){
  infoBasesDatos.style.left="35vw"
  infoBasesDatos.style.width="45vw"
  infoBasesDatos.style.height="70vh"

  infoBasesDatos.style.display= "block"
}

function deleteInfoBD(){
  infoBasesDatos.style.display="none"
}
function hideInfoBD(){
  // I haven´t been able to hide info on the click of the yellow button
  infoBasesDatos.style.display="none"
}
function bigInfoBD(){ 
  infoBasesDatos.style.left="0"
  infoBasesDatos.style.width="100%"
  infoBasesDatos.style.height="100%"
}