const openModalBtn = document.getElementById("btn-open-modal");
const modalBackground = document.querySelector(".modal-background-empleado");
const modalContainer = document.querySelector(".modal-container-empleado");

const formRegisterUpdate = document.getElementById("formRegisterUpdate");

//Inputs del formulario
const accion=document.getElementById("accion");
const txtdni = document.getElementById("dni");
const txtnombre = document.getElementById("nombre");
const txtapellidos = document.getElementById("apellidos");
const txtcelular = document.getElementById("celular");
const txtcorreo = document.getElementById("correo");
const txtdireccion = document.getElementById("direccion");
const selectgenero = document.getElementById("genero");
const selectcargo = document.getElementById("cargo");
const selecthorario = document.getElementById("horario");
const txtusuario = document.getElementById("usuario");
const txtcontrasena = document.getElementById("contrasena");
const selectrol = document.getElementById("rol");

window.onload = () => {
  fetch(`/dashboard/mantenimientoEmpleado/formData`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      const fragCargo = document.createDocumentFragment();
      const fragHorario = document.createDocumentFragment();
      const fragRol = document.createDocumentFragment();
      for (e of res[0]) {
        const option = document.createElement("OPTION");
        option.setAttribute("value", e.codigo);
        option.innerText = e.cargo;
        fragCargo.appendChild(option);
      }
      for (e of res[1]) {
        const option = document.createElement("OPTION");
        option.setAttribute("value", e.codigo);
        option.innerText = `${e.descripcion} ${e.hora_inicio.substring(
          0,
          5
        )}-${e.hora_fin.substring(0, 5)}`;
        fragHorario.appendChild(option);
      }
      for (e of res[2]) {
        const option = document.createElement("OPTION");
        option.setAttribute("value", e.codigo);
        option.innerText = e.tipo;
        fragRol.appendChild(option);
      }

      selectcargo.appendChild(fragCargo);
      selecthorario.appendChild(fragHorario);
      selectrol.appendChild(fragRol);
    });
};

openModalBtn.addEventListener("click", () => {
  modalBackground.classList.add("show-background");
  modalContainer.classList.add("show-modal");
  txtcontrasena.setAttribute("type", "password");

  txtdni.value = '';
  txtnombre.value = '';
  txtapellidos.value = '';
  txtcelular.value = '';
  txtcorreo.value = '';
  txtdireccion.value = '';
  selectgenero.value = '0';
  selectcargo.value = '0';
  selecthorario.value = '0';
  txtusuario.value = '';
  txtcontrasena.value = '';
  selectrol.value = '0';
  accion.value='insertar'
});

document.getElementById("btnCancel").addEventListener("click", () => {
  modalBackground.classList.remove("show-background");
  modalContainer.classList.remove("show-modal");
});

document.getElementById("closeModal").addEventListener("click", () => {
  modalBackground.classList.remove("show-background");
  modalContainer.classList.remove("show-modal");
});

txtdni.addEventListener("keyup", (e) => {
  txtusuario.setAttribute("value", e.target.value);
  txtusuario.innerText=e.target.value;
});

const buttonsUpdate = document.querySelectorAll(".openModalUpdate");
//inputs del modal

buttonsUpdate.forEach((element) => {
  element.addEventListener("click", () => {
    fetch(
      `/dashboard/mantenimientoEmpleado/detalle/${element.childNodes[1].value}`
    )
      .then((res) => res.json())
      .then((data) => {

        info = data[0];
        txtdni.value = info.dni;
        txtnombre.value = info.nombre;
        txtapellidos.value = info.apellidos;
        txtcelular.value = info.celular;
        txtcorreo.value = info.correo;
        txtdireccion.value = info.direccion;
        selectgenero.value = info.genero;
        selectcargo.value = info.cod_cargo.toString();
        selecthorario.value = info.cod_horario.toString();
        txtusuario.value = info.dni;
        txtcontrasena.setAttribute("type", "text");
        txtcontrasena.value = info.contrasena;
        selectrol.value = info.tipo_usu.toString();
      });
    accion.value='actualizar'
    modalBackground.classList.add("show-background");
    modalContainer.classList.add("show-modal");
    modalContainer.childNodes[1].childNodes[1].innerText = "Modificar empleado";
  });
});
