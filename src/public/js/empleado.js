const openModalBtn =  document.getElementById("btn-open-modal");
const modalBackground = document.querySelector(".modal-background-empleado");
const modalContainer = document.querySelector(".modal-container-empleado")

const formRegisterUpdate = document.getElementById('formRegisterUpdate');

//Inputs del formulario
const txtdni=document.getElementById('dni');
const txtnombre=document.getElementById('nombre');
const txtapellidos=document.getElementById('apellidos');
const txtcelular=document.getElementById('celular');
const txtcorreo=document.getElementById('correo');
const txtdireccion=document.getElementById('direccion');
const selectgenero=document.getElementById('genero');
const selectcargo=document.getElementById('cargo');
const selecthorario=document.getElementById('horario');
const txtusuario=document.getElementById('usuario');
const txtcontrasena=document.getElementById('contrasena');
const selectrol=document.getElementById('rol');


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

const buttonsUpdate=document.querySelectorAll('.openModalUpdate')
//inputs del modal


buttonsUpdate.forEach(element => {
  element.addEventListener("click",()=>{
    fetch(`/dashboard/mantenimientoEmpleado/detalle/${element.childNodes[1].value}`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data.data[0])
      info=data.data[0]
      txtdni.value=info.dni
      txtnombre.value=info.nombre
      txtapellidos.value=info.apellidos
      txtcelular.value=info.celular
      txtcorreo.value=info.correo
      txtdireccion.value=info.direccion
      selectgenero.value=info.genero
      selectcargo.value=info.cargo
      selecthorario.value=info.horario
      txtusuario.value=info.dni
      txtcontrasena.setAttribute('type','text')
      txtcontrasena.value=info.contrasena
      info.rol=='Administrador'?selectrol.value='1':selectrol.value='2'
    })

    modalBackground.classList.add("show-background-empleado")
    modalContainer.classList.add("show-modal-empleado")
    modalContainer.childNodes[1].childNodes[1].innerText="Modificar empleado"
  })

});