
import { pool } from "../db.js";
import { DataTime, generarIDAleatorioVentas } from "../utils.js";

//registrar venta
export const registrarVenta = async (req, res) =>{
    const {cliente, total} = req.body
    const fecha = DataTime()
    const id_venta = generarIDAleatorioVentas(10)
    const estado = 0
    const { nombre, apellido, mail, cel } = cliente
    console.log(id_venta);
    try {
        const [rows] = await pool.query(
            "INSERT INTO ventas (id_venta, fecha, nombre, apellido, mail, cel, estado, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",[
              id_venta, fecha, nombre, apellido, mail, cel, estado, total]
          );
        console.log(rows);
        if (rows) {
          res.status(200).json({ status: 200, message: 'registro creado', id: id_venta});
        }
      } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
      }

} 

//Asociar producto a venta
export const registrarProdVenta = async (req, res) =>{
  const {id_venta, id_producto, IdGenerate, Tipo, cantidad, subtotal} = req.body
  console.log(id_venta);
  try {
      const [rows] = await pool.query(
          "INSERT INTO ventasProduct (id_venta, id_producto, IdGenerate, Tipo, cantidad, subtotal) VALUES (?, ?, ?, ?, ?, ?);",[
            id_venta, id_producto, IdGenerate, Tipo, cantidad, subtotal]
        );
      console.log(rows);
      if (rows) {
        res.status(200).json({  status: 200, message: 'producto agregado', response: rows});
      }
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }

} 


//get ventas
export const getVentas = async (req, res) =>{
  let ventas = []
  try {
    const [rows] = await pool.query("SELECT * FROM ventas");
    rows.map((pac) =>{
      ventas.push(pac)
    })
    res.send( {status: 200, message: 'succes', response: ventas} );
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
} 

//get venta
export const getVentaId = async (req, res) =>{
  const rows = {
    venta : [],
    productos: []
  }
  try {
    const { idg } = req.params;
    console.log(idg);
    const [venta] = await pool.query("SELECT * FROM ventas WHERE id_venta = ?", [
      idg,
    ]);
    const [productos] = await pool.query("SELECT * FROM ventasProduct WHERE id_venta = ?", [
      idg,
    ]);


    if (venta.length <= 0 && productos.length != 0) {
      return res.status(404).json({ message: "producto not found" });
    }else{
      rows.productos = productos
      rows.venta = venta
      res.json(rows);
    }

  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }

} 