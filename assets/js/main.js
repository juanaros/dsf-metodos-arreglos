const tablaTareas = document.querySelector('#tareas');
const inputTarea = document.querySelector('#nuevaTarea');
const agregarBtn = document.querySelector('#agregarTarea');
const contTotal = document.querySelector('#total');
const contReady = document.querySelector('#hechas');

const arregloTareas = [
    {id: 1, nombre: "Limpiar toda la casa sin dejar una sola gota de pintura", status: false},
    {id: 2, nombre: "Llegar a diamante en las rankeds", status: false},
    {id: 3, nombre: "Sacar a pasear al perrito", status: false}
];

agregarBtn.addEventListener("click", () => {
    agregarTarea()
})

const agregarTarea = () => {
    if (inputTarea.value == "") {
        alert("Por favor ingrese una tarea")
        return;
    }
    const nuevaTarea = {
        id: arregloTareas.length + 1,
        nombre: inputTarea.value,
        status: false 
    };
    arregloTareas.push(nuevaTarea);
    actualizarLista();
}

const actualizarLista = () => {
    let html = '', contarTareasListas = 0;
    for(let tarea of arregloTareas){
        if(tarea.status){
            contarTareasListas++;
        }
        html +=`
            <tr>
                <td>${tarea.id}</td>
                <td>${tarea.nombre}</td>
                <td><button onclick="update(${tarea.id})" class="btn px-4 btn-${tarea.status ? 'primary' : 'warning'}")">${tarea.status ? 'Hecha' : 'Pendiente'}</button></td>
                <td><button onclick="borrar(${tarea.id})" class="btn bg-danger text-light">Borrar</button></td>
            </tr>
            `;
    }

    inputTarea.value = '';
    tablaTareas.innerHTML = html;

    contTotal.innerHTML = arregloTareas.length;
    contReady.innerHTML = contarTareasListas;
}

const update = (idTarea) => {
        const index = arregloTareas.findIndex(task => task.id === idTarea);
        arregloTareas[index].status = !arregloTareas[index].status;
        actualizarLista();
}

const borrar = (idTarea) => {
    const confirmacion = confirm('¿Estás seguro de borrar la tarea?');
    if(confirmacion){
        const index = arregloTareas.findIndex(task => task.id === idTarea);
        arregloTareas.splice(index, 1)
        actualizarLista();
    }
}