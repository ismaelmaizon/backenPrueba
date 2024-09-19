import { pool } from "../db.js";


export const createEstado = async (req, res) => {
    const {estado} = req.body
    console.log(estado);
    try{
        const responses = await pool.query("INSERT INTO Estado (estado) VALUES (?)", [estado]);
        console.log(responses);
        
        res.status(200).json({message: 'estado registrado'} )
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'usuario no registrado'} )

    }
};

export const getEstados = async (req, res) => {
    
    try{
        const [responses] = await pool.query("SELECT * FROM Estado");
        console.log(responses);
        
        res.status(200).json({message: 'Ok', response: responses} )
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'usuario no registrado'} )

    }
};