
const openModalBtn = document.getElementById("btn-open-modal");
const modalBackground = document.querySelector(".modal-background");
const modalContainer = document.querySelector(".modal-container");
const btnSubmitData = document.getElementById("btnSubmitData");
const inputDni = document.getElementById("inputDni");
const messageError = document.getElementById("messageError");

function closeModal() {
  modalBackground.classList.remove("show-background");
  modalContainer.classList.remove("show-modal");
  inputDni.value="";

  messageError.style.backgroundColor = "transparent";
  messageError.innerText = "";
}

openModalBtn.addEventListener("click", () => {
  modalBackground.classList.add("show-background");
  modalContainer.classList.add("show-modal");
});

document.getElementById("btnCancel").addEventListener("click", () => {
  closeModal()
});

document.getElementById("closeModal").addEventListener("click", () => {
  closeModal()
});

btnSubmitData.addEventListener("click", (e) => {
  messageError.style.backgroundColor = "transparent";
  messageError.innerText = "";
  let dniValido = false;
  e.preventDefault();

  if (isNaN(inputDni.value)==false && inputDni.value.length == 8 && !inputDni.value.includes('.')) {
    dniValido = true;
  }
  if (dniValido == false) {
    setTimeout(() => {
      messageError.style.backgroundColor = "rgb(255, 203, 203)";
      messageError.innerText = "Ingrese un numero de dni valido";
    }, 300);
  } else {
    modalContainer.submit();
  }
});

const messagesContainer = document.getElementById("messagesContainer");
const flashErrorMessage = document.getElementById("flashErrorMessage");
const flashErrorMessageCountDown = document.getElementById(
  "flashErrorMessageCountDown"
);

flashErrorMessage.style.transition = ".5s ease";
flashErrorMessage.style.color = "red";

flashErrorMessageCountDown.style.fontSize = "12px";
flashErrorMessageCountDown.style.color = "red";
flashErrorMessageCountDown.style.transition = ".5s ease";

window.onload = () => {
  let seg = 5;
  if (flashErrorMessage.innerHTML != " ") {
    messagesContainer.style.width = "90%";
    let countDown = setInterval(() => {
      flashErrorMessageCountDown.innerText = `Este mensaje se cerrara en ${seg} segundo(s)`;
      seg--;
      if (seg == -1) {
        flashErrorMessage.style.opacity = "0";
        flashErrorMessageCountDown.style.opacity = "0";
        messagesContainer.style.opacity = "0";
        clearInterval(countDown);
      }
    }, 1000);
  }
};
