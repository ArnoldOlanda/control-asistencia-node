const openModalBtn =  document.getElementById("btn-open-modal");
const modalBackground = document.querySelector(".modal-background-empleado");
const modalContainer = document.querySelector(".modal-container-empleado")

const formRegisterUpdate = document.getElementById('formRegisterUpdate');
const txtdni=document.getElementById('dni');
const txtusuario=document.getElementById('usuario');


openModalBtn.addEventListener("click",()=>{
  modalBackground.classList.add("show-background-empleado")
  modalContainer.classList.add("show-modal-empleado")
  console.log("clicked")
})

document.getElementById("btnCancel").addEventListener("click",()=>{
  modalBackground.classList.remove("show-background-empleado")
  modalContainer.classList.remove("show-modal-empleado")
})

document.getElementById("closeModal").addEventListener("click",()=>{
  modalBackground.classList.remove("show-background-empleado")
  modalContainer.classList.remove("show-modal-empleado")
})

// formRegisterUpdate.addEventListener('submit',(e)=>{
//   e.preventDefault()

// })
txtdni.addEventListener('keyup',(e)=>{
  txtusuario.setAttribute('value',e.target.value);
  txtusuario.innerText(e.target.value);
})

const buttonsDetails=document.querySelectorAll('.openModalShowDetails')
//inputs del modal


buttonsDetails.forEach(element => {
  element.addEventListener("click",()=>{
    //console.log(element.childNodes[1].value)
    fetch(`/dashboard/mantenimientoEmpleado/detalle/${element.childNodes[1].value}`)
    .then(res=>res.json())
    .then(data=>console.log(data.data))

    modalBackground.classList.add("show-background-empleado")
    modalContainer.classList.add("show-modal-empleado")
  })

});