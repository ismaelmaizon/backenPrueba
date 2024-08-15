import { Router } from "express";
import {
  createProducto,
  deleteProducto,
  getProducto,
  getProductos,
} from "../controllers/productos.controller.js";

const router = Router();

// GET todos los /productos
router.get("/prod", (req, res)=>{ res.send({status:200, message: 'probando probando'}) });
router.get("/productos", getProductos);
// GET un producto
router.get("/producto/:idg", getProducto);
// INSERT un producto
router.post("/producto", createProducto);
// DELETE un producto
router.delete("/producto/:id", deleteProducto);


// UPDATE un producto

export default router;
