// import app from "./app.js";  //Al importar se debe aclarar que es un archivo js
// //import {pool} from "./db.js";

// //para probar si funciona la seleccion
// //borramos esto porque no lo vamos a estar llamando siempre, sino que solo cuando lo necesitemos 
// // pool.query("SELECT NOW()", (err, res) => {
// //     console.log(err, res.rows);
// //     app.listen(3000);
// //     console.log("Server on port", 3000);
// //     pool.end();
// // });

// app.listen(3000);  //Esto es para lanzar en el puerto 3000 (CAMBIE EL PUERTO A 3030 PORQUE CON 3000 ME SALIAN ERRORES, DEBIDO A QUE ESE PUERTO ESTA SIENDO USADO TAMBIEN
// console.log("Server on port", 3000);  //Para lanzarlo escribimos en la terminal npm run dev

// //El backend esta corriendo en el localhost:3000
// //El frontend esta corriendo en el puerto 5173 http://localhost:5173/

import app from "./app.js";
import { PORT } from "./config.js";

app.listen(PORT);

console.log("Server on port", PORT);