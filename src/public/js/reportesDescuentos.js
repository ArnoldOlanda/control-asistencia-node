const selectMes=document.getElementById('selectMes');
const btnFiltro=document.getElementById('btnFiltro');
const tableDataDescuentos=document.getElementById('tableDataDescuentos');

btnFiltro.addEventListener("click",()=>{
    if(selectMes.value=="0") alert("Por favor seleccione un opcion de la lista")
    else{
        tableDataDescuentos.innerHTML=""
        const fragment=document.createDocumentFragment()
        const trCabecera=document.createElement("TR")
        const tdDni=document.createElement("TH");
        const tdNombre=document.createElement("TH");
        const tdDescuento=document.createElement("TH");

        tdDni.innerText="DNI"
        tdNombre.innerText="Empleado"
        tdDescuento.innerText="Descuento"
        trCabecera.appendChild(tdDni)
        trCabecera.appendChild(tdNombre)
        trCabecera.appendChild(tdDescuento)
        fragment.appendChild(trCabecera)
        fetch(`/dashboard/reportes/asistencia/descuentos/mes/${selectMes.value}`)
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            
            for(element of res){
                const tr=document.createElement("TR")
                const dni=document.createElement("TD")
                const nombre=document.createElement("TD")
                const descuento=document.createElement("TD")

                dni.innerText=element.dni
                nombre.innerText=element.nombre
                descuento.innerText=element.total_descuento
                tr.appendChild(dni)
                tr.appendChild(nombre)
                tr.appendChild(descuento)
                fragment.appendChild(tr)
                tableDataDescuentos.appendChild(fragment)
            }
        })
        .catch(res=>console.error(res))
    }
})