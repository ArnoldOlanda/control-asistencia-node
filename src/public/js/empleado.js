const openModalBtn =  document.getElementById("btn-open-modal");
const modalBackground = document.querySelector(".modal-background-empleado");
const modalContainer = document.querySelector(".modal-container-empleado")

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