
import axios from "./axios";

//Es para comunicar la parte front del formulario con la back
//creamos aca todas las peticiones que se necesiten para no tener que estar modificando cada vez el archivo de axios.js

export const crearTareaRequest =  (tarea) => axios.post("/tareas", tarea)

export const listarTareasRequest = () => axios.get("/tareas")

export const eliminarTareaRequest = (id) => axios.delete(`/tareas/${id}`)

export const listarTareaRequest =  (id) => axios.get(`/tareas/${id}`)

export const actualizarTareaRequest = (id, tarea) => axios.put(`/tareas/${id}`, tarea)