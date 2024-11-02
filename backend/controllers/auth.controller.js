import { pool } from "../db.js"
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js"
import md5 from "md5";

export const signin = async (req, res) => {
    const { email, password } = req.body;

    //Buscamos al ususario dentro de la base de datos a ver si está registrado, buscamos el email
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    //Si ese email que viene desde result es igual a 0, es decir que no esta, entonces que le retorne un mensaje diciendo que el correo no esta registrado
    if (result.rowCount === 0) {
        return res.status(400).json({ message: "El correo no esta registrado" });
    }
    //Una vez que encuentre el correo hay que validar que las contraseñas sean las mismas, que conicidan el mail y password con los de la base de datos
    const validPassword = await bcrypt.compare(password, result.rows[0].password);

    //Una vez que coinciden, nos deja entrar, pero sino es el mismo, le decimos que la contraseña ingresada es incorrecta
    if (!validPassword) {
        return res.status(400).json({ message: "La contraseña es incorrecta." })
    }
    //Como ya estamos logueados, tenemos el token, la cookie, en el signup, debemos hacerlo tambien aca 
    const token = await createAccessToken({ id: result.rows[0].id });
    console.log(result);
    res.cookie('token', token, {
        //httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 24 * 1000,
    });
    return res.json(result.rows[0]);
}

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        //encriptamos el password usando la libreria bcrypt (el numero es la canidad de veces que se repite el algoritmos)
        const hashedPassword = await bcrypt.hash(password, 10);
        //console.log(hashedPassword);
        md5(email);
        const gravatar = "https://gravatar.com/avatar" + md5(email); // Le pedimos que guarde en esta constante lo viene de este hash, que seria el id del mail asociado que tiene gravatar

        const result = await pool.query('INSERT INTO usuarios (name, email, password, gravatar) VALUES ($1, $2, $3, $4) Returning *', [name, email, hashedPassword, gravatar])
        //Le indica al usuario que el usuario ya esta creado y autentificado entonces podes usar estos datos que te voy a mandar, o sugerir. en base a esos datos manda un token y desde el backend se pueden controlar los permisos que se le dan al usuario
        //hacemos el token en otra carpeta, la libs
        const token = await createAccessToken({ id: result.rows[0].id });
        console.log(result);
        res.cookie("token", token, {
            //httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 24 * 1000,
        });
        //solo para que lo lean las http, sameSite solo lo lee el mismo sitio el valor es none porque el frontend se puede tener en distinto dominio, maxAge es cuanto quiero que dure la cookie 1000 milisegundos, total 1 dia

        return res.json(result.rows[0]);

    } catch (error) {
        if (error.code === "23505") {
            return res.status(400).json({ message: "El correo ya esta registrado" });
        }
        next(error);
    }

    //cookies: los navegadores la guardan de forma automatica

};


export const signout = (req, res) => {
    res.clearCookie("token"); //eliminamos la cookie al cerrar la sesion
    return res.json({ message: "Sesion cerrada" })
};

export const profile = async (req, res) => {
    const result = await pool.query('SELECT * FROM usuarios WHERE id =$1', [req.usuarioId]); //busca dentro de la tabla de usuarios el id de los usuarios logueados y lo guarda
    return res.json(result.rows[0]);
};