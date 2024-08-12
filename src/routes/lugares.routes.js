import { Router } from "express";

import { createLugar, getLugares } from "../controllers/lugares.controller.js";

const router = Router();

// GET lugares
router.get("/lugares", getLugares);
// CREATE lugares
router.post("/lugares", createLugar);


export default router;
