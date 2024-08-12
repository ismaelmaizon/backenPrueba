import express from "express";
import morgan from "morgan";
import cors from 'cors';

import productosRoutes from "./routes/productos.routes.js"
import lugaresRoutes from "./routes/lugares.routes.js"
import lugaresRoutesProd from "./routes/lugaresProd.routes.js"
import ventasRoutes from "./routes/ventas.routes.js"
import tiposRoutes from "./routes/tipos.routes.js"

const app = express();
const corsOptions = {
  //To allow requests from client
  origin: [
    "http://localhost:5173",
    "localhost:8080"
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

// Middlewares
app.use(cors(corsOptions))
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/tipos", tiposRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/lugares", lugaresRoutes);
app.use("/api/lugaresProd", lugaresRoutesProd);
app.use("/api/ventas", ventasRoutes);


app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
