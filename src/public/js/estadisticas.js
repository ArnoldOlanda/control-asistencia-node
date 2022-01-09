function totalAsistenciasChart(ctx) {
    fetch("/dashboard/estadisticas/data/total")
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
        const chart = new Chart(ctx, {
            type: "pie",
            data: {
              labels: ["Asistencias", "Tardanzas", "Faltas"],
              datasets: [
                {
                  label: "Asistencias",
                  backgroundColor: [
                    "green",
                    "blue",
                    "black",
                  ],
                  data: [res.asistencias,res.tardanzas,res.faltas],
                },
              ],
              hoverOffset: 4,
            },
            options: {
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Recuento general de las asistencias",
                  font: { size: 15 },
                  padding: 20,
                },
                legend: {
                  position: "bottom",
                  labels: {
                    padding: 20,
                    boxWidth: 15,
                    font: {
                      family: "JetBrains Mono",
                      color: "gray",
                    },
                  },
                },
              },
            },
          });
    })
    .catch(e=>console.error(e))
    
  }
function asistenciasPorEmpleadoChart(ctx){
    fetch("/dashboard/estadisticas/data/empleado")
    .then(res=>res.json())
    .then(res=>{
        console.log(res)
        var delayed;
        const chart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: res.map(e=>e.nombre),
              datasets: [
                {
                  label: 'Asistencias',
                  data: res.map(e=>e.asistencias),
                  borderColor: 'green',
                  backgroundColor: 'green',
                },
                {
                  label: 'Tardanzas',
                  data: res.map(e=>e.tardanzas),
                  borderColor: 'blue',
                  backgroundColor: 'blue',
                },
                {
                  label: 'Faltas',
                  data: res.map(e=>e.faltas),
                  borderColor: 'black',
                  backgroundColor: 'black',
                }
              ],
              hoverOffset: 4,
            },
            options: {
              responsive: true,
              animation: {
                onComplete: () => {
                  delayed = true;
                },
                delay: (context) => {
                  let delay = 0;
                  if (context.type === 'data' && context.mode === 'default' && !delayed) {
                    delay = context.dataIndex * 300 + context.datasetIndex * 100;
                  }
                  return delay;
                },
              },
              plugins: {
                legend: {
                  position: 'bottom',
                  padding:10
                },
                title: {
                  display: true,
                  text: 'Asistencias por empleado'
                }
              },
            },
          });
    })
    .catch(e=>console.error(e))
}

function asistenciaPorMesChart(ctx){
  const anioActual=new Date()
  fetch("/dashboard/estadisticas/data/mes/"+anioActual.getFullYear())
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      var delayed;
      const chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: res[0].map(e=>e.meses),
            datasets: [
              {
                label: 'Asistencias',
                data: res[1].map(e=>e.asistencias),
                borderColor: 'green',
                backgroundColor: 'green',
              },
              {
                label: 'Tardanzas',
                data: res[2].map(e=>e.tardanzas),
                borderColor: 'blue',
                backgroundColor: 'blue',
              },
              {
                label: 'Faltas',
                data: res[3].map(e=>e.faltas),
                borderColor: 'black',
                backgroundColor: 'black',
              },
            ],
            hoverOffset: 4,
          },
          options: {
            responsive: true,
            animation: {
              onComplete: () => {
                delayed = true;
              },
              delay: (context) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default' && !delayed) {
                  delay = context.dataIndex * 300 + context.datasetIndex * 100;
                }
                return delay;
              },
            },
            plugins: {
              legend: {
                position: 'bottom',
                padding:10
              },
              title: {
                display: true,
                text: 'Asistencias por mes del presente año'
              }
            },
          },
        });
  })
}

  function renderChart() {
    const ctx = document.querySelector("#chart1").getContext("2d");
    const ctx2 = document.querySelector("#chart2").getContext("2d");
    const ctx3 = document.querySelector("#chart3").getContext("2d");
    totalAsistenciasChart(ctx);
    asistenciasPorEmpleadoChart(ctx2)
    asistenciaPorMesChart(ctx3)

  }
  renderChart();