const openModalBtn = document.getElementById("btn-open-modal");
const modalBackground = document.querySelector(".modal-background-horario");
const modalContainer = document.querySelector(".modal-container-horario");

const codigoHorario=document.getElementById("codigo")
const txtDescripcion=document.getElementById("descripcion")
const txtHoraInicio=document.getElementById("horaInicio")
const txtHoraFin=document.getElementById("horaFin")

openModalBtn.addEventListener("click", () => {
  modalBackground.classList.add("show-background");
  modalContainer.classList.add("show-modal");
  modalContainer.childNodes[1].childNodes[1].innerText = "Nuevo horario";
});

document.getElementById("btnCancel").addEventListener("click", () => {
  modalBackground.classList.remove("show-background");
  modalContainer.classList.remove("show-modal");
  codigoHorario.value=""
});

document.getElementById("closeModal").addEventListener("click", () => {
  modalBackground.classList.remove("show-background");
  modalContainer.classList.remove("show-modal");
  codigoHorario.value=""
});

const buttonsUpdate = document.querySelectorAll(".openModalUpdate");
const buttonsDelete = document.querySelectorAll(".btnDelete");

buttonsUpdate.forEach((element) => {
  element.addEventListener("click", () => {
    accion.value='actualizar'
    modalBackground.classList.add("show-background");
    modalContainer.classList.add("show-modal");
    //console.log(element.childNodes[1].value)
    codigoHorario.value=element.childNodes[1].value
    modalContainer.childNodes[1].childNodes[1].innerText = "Modificar horario";

    const data=element.childNodes[3].value.split("_")
    txtDescripcion.value=data[0]
    txtHoraInicio.value=data[1]
    txtHoraFin.value=data[2]
  });
});

buttonsDelete.forEach((element)=>{
  element.addEventListener("click",()=>{
    let confirmDelete=confirm("¿Realmente deseas eliminar este registro?")
    let codigo= element.childNodes[1].value
    console.log(`/dashboard/mantenimientoHorario/eliminar/${codigo}`)
    if(confirmDelete){
      location.href=`/dashboard/mantenimientoHorario/eliminar/${codigo}`

    }
  })
})