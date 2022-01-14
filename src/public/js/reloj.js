const fecha = document.getElementById("fecha");
const reloj = document.getElementById("reloj");
const ampm = document.getElementById("ampm");

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
}, 200);