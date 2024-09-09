import express from "express";
import morgan from "morgan";
import cors from 'cors';
import __dirname  from './utils.js'
import multer from "multer";



import productosRoutes from "./routes/productos.routes.js"
import lugaresRoutes from "./routes/lugares.routes.js"
import lugaresRoutesProd from "./routes/lugaresProd.routes.js"
import ventasRoutes from "./routes/ventas.routes.js"
import tiposRoutes from "./routes/tipos.routes.js"
import logins from "./routes/logins.routes.js"
//passport
import passport from 'passport';
//import { initializePassportJWT } from './passport/passport-jwt.js';


const app = express();
const corsOptions = {
  //To allow requests from client
  origin: [
    "https://beige-buffalo-119903.hostingersite.com",
    "http://localhost:5173",
    "localhost:8080"
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};



// Middlewares
// Configuración para servir archivos estáticos
app.use('/static', express.static('src/img'));
//app.use(express.urlencoded({extended:false})) //permite poder entender lo que los formularios me estan enviando
app.use(cors(corsOptions))
app.use(morgan("dev"));
app.use(express.json());

//initializePassportJWT()
app.use(passport.initialize())// de esta manera inicializamos passport
//recordemos que passport almacena en una session la informacion del usuario por ende debemos usar el siguiente meadleware


// Routes
app.use("/api/logins", logins);
app.use("/api/tipos", tiposRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/lugares", lugaresRoutes);
app.use("/api/lugaresProd", lugaresRoutesProd);
app.use("/api/ventas", ventasRoutes);


app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
