
const toogleSubMenu=document.getElementById("toogleSubMenu");
const menuReportes=document.getElementById("menu-reportes");
const flecha=document.getElementById("flecha");

toogleSubMenu.addEventListener("click",(e)=>{
    menuReportes.classList.toggle("show-sub-menu");
    flecha.classList.toggle("rotar-flecha")
})