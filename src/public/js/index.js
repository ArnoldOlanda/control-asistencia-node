const fecha = document.getElementById("fecha");
const reloj = document.getElementById("reloj");
const ampm = document.getElementById("ampm");

const openModalBtn =  document.getElementById("btn-open-modal");
const modalBackground = document.querySelector(".modal-background");
const modalContainer = document.querySelector(".modal-container")

let dia,
  mes,
  anio,
  hora,
  minuto,
  segundo,
  txtampm = "";

const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

setInterval(() => {
  //Instancia fecha actual
  const fechaActual = new Date();

  fechaActual.getDate() < 10
    ? (dia = `0${fechaActual.getDate()}`)
    : (dia = fechaActual.getDate());

  mes = meses[fechaActual.getMonth()];
  anio = fechaActual.getFullYear();

  if (fechaActual.getHours() > 12) {
    hora = fechaActual.getHours() - 12;
    if (parseInt(hora) < 10) hora = `0${hora}`;
    txtampm = "PM";
  } else {
    hora = fechaActual.getHours();
    txtampm = "AM";
  }

  fechaActual.getMinutes() < 10
    ? (minuto = `0${fechaActual.getMinutes()}`)
    : (minuto = fechaActual.getMinutes());
  fechaActual.getSeconds() < 10
    ? (segundo = `0${fechaActual.getSeconds()}`)
    : (segundo = fechaActual.getSeconds());

  fecha.innerHTML = `${dia} de ${mes} del ${anio}`;
  reloj.innerText = `${hora}:${minuto}:${segundo}`;
  ampm.innerText = txtampm;
}, 500);

openModalBtn.addEventListener("click",()=>{
  modalBackground.classList.add("show-background")
  modalContainer.classList.add("show-modal")
})

// modalBackground.addEventListener("click",()=>{
//   modalBackground.classList.remove("show-background")
//   modalContainer.classList.remove("show-modal")
// })

document.getElementById("btnCancel").addEventListener("click",()=>{
  modalBackground.classList.remove("show-background")
  modalContainer.classList.remove("show-modal")
})

document.getElementById("closeModal").addEventListener("click",()=>{
  modalBackground.classList.remove("show-background")
  modalContainer.classList.remove("show-modal")
})

const messagesContainer=document.getElementById('messagesContainer');
const flashErrorMessage=document.getElementById('flashErrorMessage');
const flashErrorMessageCountDown=document.getElementById('flashErrorMessageCountDown');



flashErrorMessage.style.transition='.5s ease'
flashErrorMessage.style.color='red'

flashErrorMessageCountDown.style.fontSize='12px'
flashErrorMessageCountDown.style.color='red'
flashErrorMessageCountDown.style.transition='.5s ease'
window.onload=()=>{
    
    let seg=5
    if(flashErrorMessage.innerHTML!=" "){
      messagesContainer.style.width='90%'
      let countDown=setInterval(()=>{
        flashErrorMessageCountDown.innerText=`Este mensaje se cerrara en ${seg} segundo(s)`
        seg--
        if(seg==-1){
          flashErrorMessage.style.opacity='0'
          flashErrorMessageCountDown.style.opacity='0'
          messagesContainer.style.opacity='0'
          clearInterval(countDown)
        }
      },1000)
    }
    
    
    
  
}