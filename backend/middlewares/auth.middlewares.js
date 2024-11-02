import jwt, { decode } from "jsonwebtoken";

export const isAuth = (req, res, next) => {
    const token = req.cookies.token;
//Si no tiene token que nos responda un estado 401 y le diga no estas autorzado, porque en realidad lo que necesitamos es el id no el token
    if(!token) {
        return res.status(401).json({
            message: 'No esta autorizado'
    });
    }

    //como lo que se necesita es el usuario.. desiframos lo que encriptamos anteriormente, para eso debemos preguntar una vez que tenga token, con jwt
    //verificamos el token, le pasamos la clave que tenemos entonces si hay algun error para decodificar el token, devuelve un error indicandole al ususario que no esta autorizado
    //Si el token esta y se puede decodificar entonces que lo guarde en request, en la peticion del parametro request para obtener y mostrar el id del usuario
    jwt.verify(token, "xyz123", (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'No estas autorizado'
            });
        }
        req.usuarioId = decoded.id;
        next();
    });
};
