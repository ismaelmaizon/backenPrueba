import { pool } from "../db.js";
import { encriptarPass, validarPass } from "../utils.js"
import jwt from 'jsonwebtoken';


export const reg = async (req, res) => {
    const {email, password, rol} = req.body
    let pass = await encriptarPass(password)
    console.log(pass);
    console.log(email);
    console.log(rol);
    try{
        const responses = await pool.query("INSERT INTO users (email, clave, rol) VALUES (?, ?, ?)", [email, pass, rol]);
        console.log(responses);
        
        res.status(200).json({message: 'usuario registrado'} )
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'usuario no registrado'} )

    }
};


export const login = async (req, res) => {
    const {email, password} = req.body
    console.log(password);
    try{
        const [row] = await pool.query("SELECT * FROM users WHERE email = (?)", [email]);
        console.log(row);
        console.log(row[0].clave);
        let resp = await validarPass(password, row[0].clave)
        console.log(resp);
        //inicio fallido
        if(!resp || row.length == 0){
            res.status(401).json({message: 'usuario no existe o clave incorrecta'} )
        }
        //inicio exitoso
        const id = row[0].id
        const token = jwt.sign({id: id}, 'decoSecret', {
            expiresIn: '1h'
        })
        console.log(token);
        const cookiesOptions = {
            maxAge: 120000, 
            httpOnly: true 
        }
        res.cookie('jwt', token, cookiesOptions)
        res.status(200).json({message: 'inicio exitoso'} )
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'usuario no entonctrado'} )

    }
};

