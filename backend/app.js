import express from "express";
import morgan from "morgan";
import tareasRoutes from "./router/tareas.routes.js"
import authRoutes from "./router/auth.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";

import { pool } from "./db.js";

import { ORIGIN } from "./config.js";

const app = express(); //esta constante lanza a express
//Middlewares
app.use(morgan("dev"));
//CORS esto evita que nos de un error por las URLS cualquier url (pagina) le puede pedir datos al back que hemos creado
app.use(cors(
    {
        origin: ORIGIN, //peticion del front al back para produccion 
        credentials: true
    }
    // {
    //     origin: "http://localhost:5173",  //esta es la url que puede pedir los datos 
    //     credentials: true   //este es la linea de codigo que permite que se vaya el error
    // }

));
//transformamos todos los objetos a formato de javascript
//cookieParser
app.use(cookieParser());
app.use(express.json());
//formularios
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.json({ message: "Bienvenidos a mi proyecto" }));
app.get("/api/ping", async (req, res) => {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
});
app.use('/api', tareasRoutes);
app.use('/api', authRoutes);

//Manejador de errores
app.use((err, req, res, next) => {
    res.status(500).json({
        status: "error",
        message: err.message
    });
});

export default app;

//empezar la clase 2 y para hacer correr el programa poner en la terminal npm run dev 