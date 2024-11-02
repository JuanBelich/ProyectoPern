//json wen token
import jwt from "jsonwebtoken";
//encriptamos con un codigo de encriptacion 
export const createAccessToken = (paylod) => {
    return new Promise((resolve, reject) => {
    jwt.sign(paylod, "xyz123", { expiresIn: "1d"},
    (err, token) => {
        if (err) reject(err);
        resolve(token);
    });
    });
    

};
